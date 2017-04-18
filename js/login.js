var url;
var method;
var data={};
var responsedata={}; // test variable
var htmlRedirect;
$(document.body).ready(function() {
  $('.form').addClass('animated fadeIn');
  $('.hdr').addClass('animated fadeIn');
});
// Method that toggles both login and registration forms. This method relies on display style  of
// the reset form to be none
$('.prompt a').on('click',function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
// Process reset data into json file
$('.reset-form').on('submit', function(){
      url = $(this).attr('action');
      method = $(this).attr('method');
      $('.reset-info').find('.form-control').each(function(index,value){
        console.log(value);
      });

    return false;
});
// Fetch privilage lvl
function fetchPriv(lvl) {
  switch (lvl) {
    case 0:
      return "";
      break;
    case 1:
      return "gensuptswbd.html";
      break;
    case 2:
      return "supvswbd.html";
      break;
    case 3:
      return "tehpswbd.html";
      break;
    default:
      return null;
  }

}
// Process login data
$('.login-form').on('submit',function(){
  method = $(this).attr('method');
  url = $(this).attr('action');
  // for each '.form-control' inputs (usr, passwd) in login-info, append data into our obj
  $('.login-info').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
  });
  // At this point we have object {usr: "xxx", passwd: "xxxx"} , now we stringify and send client request
  var clientR = new XMLHttpRequest();
  data = JSON.stringify(data);
  clientR.open(method,url, true);
  clientR.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  clientR.onreadystatechange = function () {
    // if our request tranfer is complete and http status is OK
    if (clientR.readyState == 4 && clientR.status == 200) {
        try {
          // responsedata stores our login user info if user is authenticated
          responsedata = JSON.parse(clientR.responseText);
          console.log(responsedata);
          htmlRedirect = fetchPriv(responsedata['PRIVLVL']);
          if (htmlRedirect=="") {
              wrongPass();
          }
          else {
            $(document.body).addClass('animated fadeOut');
              window.location.replace(htmlRedirect);
          }
        } catch (e if e instanceof SyntaxError) {
            wrongPass();
        }
        }
  };
  clientR.send(data);
  return false;
});
function wrongPass() {
  // input fields incorrect, assuming its password, we clear it
  var aName = "animated shake";
  $('.form-button').addClass(aName).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    /* Act on the event */
    $(this).removeClass(aName);
  });;
  $('input[name=passwd]').val('');
}
