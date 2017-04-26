var data = {};
var items=[];

$('.find-trips').on('submit',function() {
    var findTrains = new XMLHttpRequest();
    var method = $(this).attr('method');
    var url = $(this).attr('action');

    // for each '.form-control' inputs (start, end, date) in find-trips form, append data into our obj
    $('.find-trips').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
    });
    // CHECK TO SEE IF WE ARE MOVING NORTH OR SOUTH AND SEND THAT INFO AS WELL
    if(Number(data['startTrip']) < Number(data['endTrip'])){
      data['dir'] = 'N';
    }
    else{
      data['dir'] = 'S';
    }
      /* Send our request to find available trains starting at station 1 and ending at station 2 on given date*/
    findTrains.open(method,url,true);
    findTrains.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    findTrains.onreadystatechange = function() {
      if(findTrains.status == 200 && findTrains.readyState == 4){
        data={};
        data = JSON.parse(findTrains.responseText);
        console.log(data);
        vex.dialog.alert({
              message: 'Your trip will cost $'+data['cost'],
              appendLocation: '.modal-content'
              });
      }
    };
    findTrains.send(JSON.stringify(data));

  return false;
});
$('#buytix').focus(function() {
  /* Act on the event */
  // for each key value par inside data, append each item into select boxes inside the trip form
  $.each(data, function (key, value) {
       $('select[name$=Trip]')
            .append($('<option>', { value : key.slice(0, -1) })
            .text(value));
  });

});
$(document).ready(function() {
  var splash = new XMLHttpRequest();
  var method = "POST";
  var url = "php/splash.php";

  console.log(data);
    /* Send our request to find available trains starting at station 1 and ending at station 2 on given date*/
  splash.open(method,url,true);
  splash.onreadystatechange = function() {
    if(splash.status == 200 && splash.readyState == 4){
      data={};
      data = JSON.parse(splash.responseText);
      console.log(data);
    }
  };
  splash.send();
});
$('.close-modal-01').on('click', function() {
  /* Act on the event */
  $('select').val('');
  $('body').find('input:text').val('');
});
// Aux functions
function clearForm() {
  $('select').val('');
  $('body').find('input:text').val('');
}
