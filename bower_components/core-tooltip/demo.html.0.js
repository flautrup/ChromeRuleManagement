
  document.querySelector('button').addEventListener('click', function(e) {
    var tooltips = document.querySelectorAll('core-tooltip');
    Array.prototype.forEach.call(tooltips, function(tooltip) {
      tooltip.show = !tooltip.show;
    });
  });

  document.querySelector('#fillbutton').addEventListener('click', function(e) {
    e.stopPropagation();

    var el = document.querySelector('#dynamic');
    el.insertAdjacentHTML('beforeend', '<div tip><b>See</b>. Told ya so!</div>');

  });
