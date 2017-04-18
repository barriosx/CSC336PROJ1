var url;
var method;
var data={};
/*
  Using a combination of JQuery and a javascript plugin called animated which makes the page more dynamic
*/
$(document.body).ready(function() {
  $('.form').addClass('animated fadeIn');
  $('.hdr').addClass('animated fadeIn');
});

// JQuery method that toggles the display between both login and registration forms. This method relies on display style  of
// the reset form to be none
$('.prompt a').on('click',function(){
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
// Process login data
$('.login-form').on('submit',function(){

  // for each div element inside the class 'login-info'
  // find each div element whose class is 'form control' and append its value
  // into our obj data
  $('.login-info').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
  });


  // At this point we have object {usr: "xxx", passwd: "xxxx"} , now we send a request
  // to the server

  method = $(this).attr('method'); // server needs a method to send its data
  url = $(this).attr('action'); // it needs a url to insert its request into
  var clientR = new XMLHttpRequest(); // create request object
  data = JSON.stringify(data); // cast our obj into string, specifically a JSON file
  // STEPS
  //  1.  When we create our request object, we need to call the open method, which
  //  essentially is the physical communication that the client begins with the server
  //  .send(params) =(send method , url go to, async)
  /*
      async: boolean that indicates whether or not to perform the operation asynchronously. i.e.

      If this value is false, the send() method does not return until a response from the server is received.
      If true, notification of a completed transaction is provided using event listeners.
      This must be true if the multipart attribute is true, or an exception will be thrown.
  */
  clientR.open(method,url, true);
  clientR.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // This is our event listener, an object property whose value is an anon. function that checks to
  // see if our request was send successfully
  clientR.onreadystatechange = function () {
    // if our request tranfer is complete and http status is OK
    if (clientR.readyState == 4 && clientR.status == 200) {
        try {
          // responsedata stores our login user info if user is authenticated
          responsedata = JSON.parse(clientR.responseText);
          if (responsedata == "") {
              wrongPass();
          }
          else {
            // Fade out and redirect to new page
            $(document.body).addClass('animated fadeOut');
            // CODE ...
          }
        } catch (e if e instanceof SyntaxError) {
            wrongPass();
        }
        }
  };
  clientR.send(data);
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
