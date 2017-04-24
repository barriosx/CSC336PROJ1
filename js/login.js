var url;
var method;
var data={};

// PROCESS LOGIN WHEN LOGIN BUTTON IS CLICKED (form on "SUBMIT")
$('.login-form').on('submit',function(){

  // for each div element inside the class 'login-info'
  // find each div element whose class is 'form control' and append its value
  // into our obj data
  $('.login-info').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
  });
  // At this point we have object data = {usr: "xxx", passwd: "xxxx"} , now we send a request
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
  */
  clientR.open(method,url, true);
  clientR.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // 2. This is our event listener, an object property whose value is an anonymous function that checks to
  // see if our request was send successfully
  clientR.onreadystatechange = function () {
    // if our request tranfer is complete and http status is OK
    if (clientR.readyState == 4 && clientR.status == 200) {
        try {
          // responsedata stores our login user info if user is authenticated
          responsedata = JSON.parse(clientR.responseText);
          // responsedata is an OBJECT at this point, not a string anymore

          if (responsedata == "") {
              // Back up for our catch statement
              wrongPass();
          }
          else {
            // Fade out and redirect to new page
            $(document.body).addClass('animated fadeOut');
            window.location.replace("splashboard.html");

          }
        } catch (e if e instanceof SyntaxError) {
            // This is where the client actually handles the error of a wrong pw
            wrongPass();
        }
        }
  };
  //  3. Sending our request. We can send without giving a parameter.
  //     We do that when we are usually just reading data or requesting/querying info
  //     that doesnt require some filter variable to aid in our query
  clientR.send(data);
  return false;
});


// AUXILLARY METHODS for webpage dynamic-ness

/*
  Using a combination of JQuery and a javascript plugin called animated which makes the page more dynamic
*/
$(document.body).ready(function() {
  $('.form').addClass('animated fadeInUp');
  $('.hdr').addClass('animated fadeInUp');
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
