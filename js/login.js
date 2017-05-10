var url;
var method;
var data={};

// PROCESS LOGIN WHEN LOGIN BUTTON IS CLICKED
$('.form-button').on('click',function(){

  // for each div element inside the class 'login-info'
  // find each div element whose class is 'form control' and append its value
  // into our obj data
  $('.login-info').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
  });
  // At this point we have object data = {usr: "xxx", passwd: "xxxx"} , now we send a request
  // to the server

  method = "POST"; // server needs a method to send its data
  url = "php/login.php"; // it needs a url to insert its request into
  $.ajax({
  url: url,
  type: method,
  dataType: 'json',
  data: data,
  success: function(json) {
    $(document.body).addClass('animated bounceOutDown');
    window.location.replace("splashboard.html");
  },
  error: function(errorobj,status,error) {
    wrongPass();
    console.log(error);
  }
});
  return false;
});


// AUXILLARY METHODS for webpage dynamic-ness

/*
  Using a combination of JQuery and a javascript plugin called animated which makes the page more dynamic
*/
$(document.body).ready(function() {
  $('input[name=usr]').keyup(function(event) {
    if (event.keyCode == 13) {
      $('.form-button').click();
    }
  });
});
$('.login-form').on('submit',function() {
  return false;
});
// JQuery method that toggles the display between both login and registration forms. This method relies on display style  of
// the reset form to be none
$('.prompt a').on('click',function(){
  $('input:text').val('');
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});


// JQuery event handler for when we hit reset once we fill in information to reset our password.
// Process reset data into json file
$('.reset-form').on('submit', function(){
      url = $(this).attr('action');
      method = $(this).attr('method');
      $('.reset-info').find('.form-control').each(function(index,value){
        data[$(this).attr('name')] = $(this).val();
      });

    return false;
});

// Method that simply clears and animates the password box if wrong password
// This is js/JQuery/ and animated plugin
function wrongPass() {
  // input fields incorrect, assuming its password, we clear it
  var aName = "animated shake";
  $('.form-button').addClass(aName).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    /* Act on the event */
    $(this).removeClass(aName);
  });;
  $('input[name=passwd]').val('');
}
