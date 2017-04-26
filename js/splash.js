// Import Pikaday plugin
var tripDate = new Pikaday(
{
    field: $('input[name=dateTrip]')[0], // or document.getElementById('pick1'),
    format: "MM/DD/YY",
    defaultDate: new Date(),
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
