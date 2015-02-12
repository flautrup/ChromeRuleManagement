

  addEventListener('template-bound', function(e) {

    var scope = e.target;
    scope.preload = function(e) {
      var img = document.querySelector('#' + e.target.getAttribute('target'));
      img.src = 'http://lorempixel.com/1920/1080?' + Math.random();
      e.target.textContent = 'Reload image';
    };
  });

