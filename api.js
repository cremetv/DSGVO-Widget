document.addEventListener('DOMContentLoaded', function() {
  console.log('start api get');

  let request = new XMLHttpRequest();
  request.open('GET', 'lvh.me:3010/get/5adc3t7');

  request.addEventListener('load', function(e) {
    console.log('request loaded');
    if (request.status >= 200 && request.status < 300) {
      console.log(request.responseText);
    } else {
      console.log(request.statusText, request.responseText);
    }
  });

  request.send();

});
