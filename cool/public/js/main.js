$(document).ready(function(){
  $('#apply').on('click', function(e){
    const mail_re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phone_re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    var mail = $("#mail").val();
    var surname = $("#surname").val();
    var text = $("#text").val();
    var name = $("#name").val();
    var phone = $("#phone").val();
    if(name === "" || surname === ""){
      alert("Name/Surname fields cannot be empty!");
      return false;
    }
    if(!mail_re.test(mail)){
      alert("Invalid email format");
      return false;
    }  
    if(!phone_re.test(phone)){
      alert("Invalid phone format");
      return false;
    }
    if(text === ""){
      alert("Text field cannot be empty!");
      return false;
    }
    data = {};
    data[mail] = mail;
    alert("Application received!");
    $.ajax({
      type:'POST',
      url: '/about',
      success: function(response){
        alert('Recorded');      
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
$(document).ready(function(){
  $('.delete-application').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/applications/'+id,
      success: function(response){
        alert('Deleting entry. Are you sure?');
        window.location.href='/applications';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});