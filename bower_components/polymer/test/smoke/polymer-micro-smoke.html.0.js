

  var XTrivial = Polymer.Class({

    created: function() {
      this.innerHTML = '<i>Hey</i>, is this script <b>on</b>?';
    }

  });

  document.registerElement('x-trivial', XTrivial);

