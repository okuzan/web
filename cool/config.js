var config = {};

config.domain = "cooltraining.com.ua";
config.imgsrc = "./imgs/img.jpg";
config.verification = true;
config.color= 'white';
config.locals = ['uk','en']
config['uk'] = {};
config['en'] = {};

config['uk'].menu_items = ["ГОЛОВНА", "ТРЕНІНГИ", "ПРО НАС"];	
config['en'].menu_items = ["HOME", "TRAININGS", "ABOUT US"];	

config['en'].text = "In order to confirm your application click here: http://localhost:3000/en/confirm/";
config['uk'].text = "Щоб підтвердити реєстрацію натисність сюди: http://localhost:3000/uk/confirm/";

config['en'].approve = ["Hooray!","Your email was confirmed and application received!", "RETURN"];
config['uk'].approve = ["Ура!", "Ви підтвердили імейл, інформацію збережено!", "НА ГОЛОВНУ"];

config['uk'].welcome = ["Ласкаво просимо", "На вас чекає багато приємних несподіванок! Ознайомтеся з нашими курсами і заповніть форму"];
config['en'].welcome = ["Welcome", "Nice to see you here! Check out our brand new coursed in web development for beginners!"];

config['en'].about = ["About us", "We are the best!"];
config['uk'].about = ["Про нас","Ми найкращі!"];

config['en'].courses = ["Courses", "Read more"];
config['uk'].courses = ["Курси", "Детальніше"];

config['en'].form = ["Name", "Surname", "Mail", "Phone", "Text", "SUBMIT", "APPLICATION"];
config['uk'].form = ["Ім'я", "Прізвище", "Пошта", "Телефон", "Текст", "ЗБЕРЕГТИ", "ЗАЯВКА"];

module.exports = config;