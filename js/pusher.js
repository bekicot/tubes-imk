// var pusher = new Pusher('f1fabd02f43fad9f7209', {
//   cluster: 'ap1',
//   forceTLS: true
// });

// var channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function(data) {
//   alert(JSON.stringify(data));
// });

let urlParams = new URLSearchParams(window.location.search);

Pusher.logToConsole = true;
let pusher = new Pusher('44a39a42b28e232ab4f6', {
  cluster: 'ap1',
  encrypted: true
});
let slides_id = 212;

if(!urlParams.has('token')) {
  let channel = pusher.subscribe(slides_id + '@slides');
  channel.bind('goto', function(data) {
    Reveal.navigateTo(data.page, data.section)
  });
} else {
  $(".quiz-dosen").show();
  $(".quiz-mahasiswa").hide();
}

Reveal.addEventListener('slidechanged', (event) => {
  if(urlParams.has('token')) {
    $.post(
      'http://slide-broadcast.herokuapp.com/slides/'+ slides_id +'/goto/' + event.indexh + '/' + event.indexv,
      { system_admin_token: urlParams.get('token') }
    )
  }
})
