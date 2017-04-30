var data = {};
var items=[];

$('.btn').on('click',function() {
  data = {};
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
    $.ajax({
      url: "./php/getTrains.php",
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(json) {
        vex.dialog.alert({
              message: 'Your trip will cost $'+json['cost'],
              appendLocation: '.tripsList'
              });
              var li_items = [];
              var train_num = 0;
              $.each(json,function(key, value) {
                li_items.push('<li><a href="" id=' + key + '">' + value + '</a></li>');
              });
              console.log(items);
      }
    });
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
  var method = "POST";
  var url = "php/splash.php";
  $.ajax({
  url: url,
  type: method,
  dataType: 'json',
  success: function(json) {
    data = json;
  },
  error: function(errorobj,status,error) {
    wrongPass();
    console.log(error);
  }
});
  console.log(data);
});
$('.close-modal-01').on('click', function() {
  /* Act on the event */
  $('select').val('');
  $('body').find('input:text').val('');
});
