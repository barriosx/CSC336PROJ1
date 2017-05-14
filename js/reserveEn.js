var data = {};
var items=[];

$('#enTripList').on('click','li',function() {
  data = {};
  data['train'] = $(this).text().slice(5);
  data['numTix'] = $('select[name=enNumTix]').val();
  data['start'] = $('select[name=enStartTrip]').val();
  data['end'] = $('select[name=enEndTrip]').val();
  data['date'] = enTripDate.getMoment().format("YYYY-MM-DD");
  console.log(data);
  vex.dialog.confirm({
    message: "Book trip with train "+$(this).text().slice(5)+"?",
    appendLocation: '.enWorkSpace',
    callback: function(value) {
      if (value == true) {
        console.log("Booking......");
        vex.dialog.alert({
          message:"Trip booked!",
          appendLocation: '.enWorkSpace',
          className: 'vex-theme-bottom-right-corner'
        });
        // prepare booking info
        //bookTrip(data);
      }
    }
  });

});

// Enhancement
$('#edittix').focus(function() {
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
  /* Act on the event */
  // for each key value par inside data, append each item into select boxes inside the trip form
  if ($('.enfind-trips').find('select[name=startTrip]').children('option').length <= 1) {
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
    //Also insert into base window
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
  }
});
// Enhancement Finding list of trains that service a trip from station 1 to station 2
$('input[name=enBtnFind]').on('click',function() {
  data = {};
  // want to empty unordered list before we add new train options to the list
  $('#enTripList').empty();
    data['startTrip'] = Number($('select[name=enStartTrip]').val());
    data['endTrip'] = Number($('select[name=enEndTrip]').val());
    // Check to see what direction we are moving in
    if(Number(data['startTrip']) < Number(data['endTrip'])){
      data['dir'] = 'N';
    }
    else{
      data['dir'] = 'S';
    }
    // Get day of the trip (if weekday or weekend)
    if(enTripDate.getMoment().format("dd") == "Su" || enTripDate.getMoment().format("dd") == "Sa"){
      data['day'] = "S";
    }
    else {
      data['day'] = "MF";
    }
    data['dateTrip'] = enTripDate.getMoment().format("YYYY-MM-DD")
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
        $('#enTripList').append(li_items.join(''));
      }
    });
  return false;
});
$('.close-modal-02').on('click', function() {
  /* Act on the event */
  $('select').val('');
  $('body').find('input:text').val('');
  $('#enTripList').empty();
});
