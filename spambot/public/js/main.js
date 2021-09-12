$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function(response){
        alert('Deleting entry');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

$(document).ready(function(){
  $('.sub').on('click', function(e){
    console.log("Here bbss");
    $target = $(e.target);
    const id = $target.attr('msg');
    console.log(id);
    $.ajax({
      type:'POST',
      url: '/msg/'+id,
      success: function(response){
        alert('Recorded');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

// $(document).ready(function(){
//   $form = $(this).closest("form");
//   $form.on('submit', function() {
//       var $btn = $(document.activeElement);
//       console.log("!HEEEE!Q");
//       if (
//           /* there is an activeElement at all */
//           $btn.length &&

//           /* it's a child of the form */ 
//           $form.has($btn) &&

//           /* it's really a submit element */
//           $btn.is('button[type="submit"], input[type="submit"]') &&

//           /* it has a "name" attribute */
//           $btn.is('[name]')
//       ) {
//           console.log("Seems, that this element was clicked:", $btn);
//           /* access $btn.attr("name") and $btn.val() for data */
//     }
//  });
// });