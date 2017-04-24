var data = {};
var items=[];

$('.find-trips').on('submit',function() {
  vex.dialog.open({
    message: 'work',
    appendLocation: '.modal-content',
    callback: function (value) {
        if (value) {
            console.log('Successfully destroyed the planet.')
        } else {
            console.log('Chicken.')
        }
    }
});


  return false;
});
$('').load {
  var findTrains = new XMLHttpRequest();
  var method = $(this).attr('method');
  var url = $(this).attr('action');

  // for each '.form-control' inputs (start, end, date) in find-trips form, append data into our obj
  $('.find-trips').find('.form-control').each(function(index,value) {
    data[$(this).attr('name')] = $(this).val();
  });
  console.log(data);
    /* Send our request to find available trains starting at station 1 and ending at station 2 on given date*/
  findTrains.open(method,url,true);
  findTrains.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  findTrains.onreadystatechange = function() {
    if(findTrains.status == 200 && findTrains.readyState == 4){
      data={};
      data = JSON.parse(findTrains.responseText);

      $(data).each(function(index, Element) {
          items.push($('<li/>').text(Element.title));
      });
      console.log(items);
      $('#tripList').append.apply($('#tripList'), items);
    }
  };
});
