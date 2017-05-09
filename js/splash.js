// Import Pikaday plugin
var tripDate = new Pikaday(
{
    field: $('input[name=dateTrip]')[0], // or document.getElementById('pick1'),
    format: "MM/DD/YY",
    defaultDate: new Date(),
    onSelect: function() {
      console.log("triggered");
      console.log($('select[name="numTix"] option').length);
      $('select[name=numTix]').val('1');
      if ($('.tripDetails').css('display') == "none") {
        $('.tripDetails').animate({height: "toggle", opacity: "toggle"}, "slow");
      }
    }
});
var enTripDate = new Pikaday({
  field: $('input[name=enDateTrip]')[0], // or document.getElementById('pick1'),
  format: "MM/DD/YY",
  defaultDate: new Date(),
  onSelect: function() {
    if ($('.enTripDetails').css('display') == "none") {
      $('.enTripDetails').animate({height: "toggle", opacity: "toggle"}, "slow");
    }
    if ($('select[name="enNumTix"] option').length <=2) {
      for (var i = 2; i < 9; i++) {
        $('select[name="enNumTix"]')
            .append($('<option>', { value : i })
            .text(i+' Adults'));
      }
    }
  }
});
// Import animatedModal plugin
$("#buytix").animatedModal({
    modalTarget:'modal-01',
    animatedIn:'fadeInUp',
    animatedOut:'bounceOutDown',
    color:'rgba(51, 51, 51,0.97)',
    animationDuration:'0.5s',
});
$("#edittix").animatedModal({
  modalTarget:'modal-02',
  animatedIn:'fadeInUp',
  animatedOut:'bounceOutDown',
  color:'rgba(51, 51, 51,0.97)',
  animationDuration:'0.5s',
});
$("#trains").animatedModal({
  modalTarget:'modal-03',
  animatedIn:'fadeInUp',
  animatedOut:'bounceOutDown',
  color:'rgba(51, 51, 51,0.97)',
  animationDuration:'0.5s',
});
