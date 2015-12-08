

  var XInput = Polymer.Class({

    extends: 'input',

    created: function() {
      this.value = 'x-extension';
    }

  });

  document.registerElement('x-extension', XInput);

