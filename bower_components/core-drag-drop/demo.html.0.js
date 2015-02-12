
    addEventListener('drag-start', function(e) {
      var dragInfo = e.detail;
      // flaw #2: e vs dragInfo.event
      var color = dragInfo.event.target.style.backgroundColor;
      dragInfo.avatar.style.cssText = 'border: 3px solid ' + color + '; width: 32px; height: 32px; border-radius: 32px; background-color: whitesmoke';
      e.detail.avatar.appendChild(document.querySelector('#hello'));
      dragInfo.drag = function() {};
      dragInfo.drop = drop;
    });
    //
    function drop(dragInfo) {
      var color = dragInfo.avatar.style.borderColor;
      var dropTarget = dragInfo.event.relatedTarget;
      if (color && dropTarget.id === 'drop') {
        var f = dragInfo.framed;
        var d = document.createElement('div');
        d.className = 'dropped';
        d.style.left = f.x - 4 + 'px';
        d.style.top = f.y - 4 + 'px';
        d.style.backgroundColor = color;
        dropTarget.appendChild(d);
        dropTarget.style.backgroundColor = color;
      }
    }
  