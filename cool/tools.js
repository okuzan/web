var url = require('url');
var config = require('./config.js');
let fs = require('fs');
let Course = require('./models/course');
let Ukraine = require('./models/ukraine');
let nodemailer = require("nodemailer");

module.exports = {
    send_mail: async function (address, id, code) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: "cdutboryslav@gmail.com",
                pass: "cdut2020"

            }
        });
        let result = await transporter.sendMail({
            from: "cdutboryslav@gmail.com",
            to:   address,
            text: config[code].text + id,
            subject: "Email confirmation"
        });
    },
    get_lang: function (req) {
        let q = url.parse(req.url, true);
        var lang = 'uk';
        let dash = q.pathname.split("/");
        if (dash.length >= 2) {
            let code = dash[1];
            if (code == 'en') lang = code;
        }
        return lang;
    },
    get_prefix: function (req) {
        let q = url.parse(req.url, true);
        let dash = q.pathname.split("/");
        return dash[1];
    },
    localize: function (code) {
    var data_string = "";
    fs.readFile('./views/_courses.html', function (err, data) {
        data_string = data.toString();
        let i = 0;
        for (var key of config['en'].courses) {
            let pattern = new RegExp("{{" + key + "}}", "g");
            data_string = data_string.replace(pattern, config[code].courses[i]);
            i++;
        }
        fs.writeFile("./views/courses.html", data_string, function(err, result) {
            if(err) console.log('error', err);
        });
    });
    },
    prepare_data: function (code){
        (code === 'en' ? Course : Ukraine).find({}, function (err, courses) {
    if (err) {
      console.log(err);
    } else {       
      let data = '';
      console.log(courses.length + "thats it");
      for (course of courses)  data += course.name + ' | ' + course.info + '\n';
      fs.writeFile("./public/data/data.txt", data.slice(0, -1), function(err, result) {
        if(err) console.log('error', err);
      });
    }
  });
}

};