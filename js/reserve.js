var data = {};
var items=[];

// Finding list of trains that service a trip from station 1 to station 2
$('input[name=btnfind]').on('click',function() {
  data = {};
  // want to empty unordered list before we add new train options to the list
  $('#tripList').empty();
    // for each '.form-control' inputs (start, end, date) in find-trips form, append data into our obj
    $('.find-trips').find('.form-control').each(function(index,value) {
      data[$(this).attr('name')] = $(this).val();
    });
    data['startTrip'] = Number(data['startTrip']);
    data['endTrip'] = Number(data['endTrip']);
    // Check to see what direction we are moving in
    if(Number(data['startTrip']) < Number(data['endTrip'])){
      data['dir'] = 'N';
    }
    else{
      data['dir'] = 'S';
    }
    // Get day of the trip (if weekday or weekend)
    if(tripDate.getMoment().format("dd") == "Su" || tripDate.getMoment().format("dd") == "Sa"){
      data['day'] = "S";
    }
    else {
      data['day'] = "MF";
    }
    data['dateTrip'] = tripDate.getMoment().format("YYYY-MM-DD")
    console.log(data);
      /* Send our request to find available trains starting at station 1 and ending at station 2 on given date*/
    $.ajax({
      url: "./php/getTrains.php",
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(json) {
        console.log(json);
        var li_items = [];
        var train_num = 0;
        // Insert the available trains on the form to be selected
        $.each(json,function(key, value) {
            li_items.push('<ul><li><a href= "#" id="'+key +'">'+ "Train "+ key.slice(5) +'</a></li>');
          $.each(value,function(index, el) {
            console.log(index+ "  " + el);
            li_items.push('<li>'+ el +'</li>');
          });
            li_items.push('</ul>');
        });
        $('#tripList').append(li_items.join(''));
      }
    });
  return false;
});
// Load list of stations to choose from
$('#buytix').focus(function() {
  /* Act on the event */
  // for each key value par inside data, append each item into select boxes inside the trip form
  if ($('.find-trips').find('select[name=startTrip]').children('option').length <= 1) {
    $.each(data, function (key, value) {
         $('.find-trips').find('select[name=startTrip]')
              .append($('<option>', { value : key.slice(0, -1) })
              .text(value));
    });
    $.each(data, function (key, value) {
         $('.find-trips').find('select[name=endTrip]')
              .append($('<option>', { value : key.slice(0, -1) })
              .text(value));
    });
    //Also insert into enhancement window
    $.each(data, function (key, value) {
         $('.enfind-trips').find('select[name=startTrip]')
              .append($('<option>', { value : key.slice(0, -1) })
              .text(value));
    });
    $.each(data, function (key, value) {
         $('.enfind-trips').find('select[name=endTrip]')
              .append($('<option>', { value : key.slice(0, -1) })
              .text(value));
    });
  }
});

// Talk to DB so we can get back our list of stations / bind our event handlers
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
$('#tripList').on('click','li',function() {
  data = {};
  data['train'] = $(this).text().slice(5);
  data['numTix'] = $('select[name=numTix]').val();
  data['start'] = $('select[name=startTrip]').val();
  data['end'] = $('select[name=endTrip]').val();
  data['date'] = tripDate.getMoment().format("YYYY-MM-DD");
  console.log(data);
  vex.dialog.confirm({
    message: "Book trip with train "+$(this).text().slice(5)+"?",
    appendLocation: '#ws1',
    callback: function(value) {
      if (value == true) {
        console.log("Booking......");
        // prepare booking info
        bookTrip(data);
      }
    }
  });

});

});
//Close form animation
$('.close-modal-01').on('click', function() {
  /* Act on the event */
  $('select').val('');
  $('body').find('input:text').val('');
  $('#tripList').empty();
});
function bookTrip(data){
  $.ajax({
    url: './php/bookTrip.php',
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(json) {
      vex.dialog.alert({
        message:"Thanks for booking your trip with us " + json['name'] + "!",
        appendLocation: '#ws1',
        className: 'vex-theme-bottom-right-corner'
      });
    }
  });
}
