

  var XInput = Polymer.Class({

    extends: 'input',

    created: function() {
      this.value = 'Hey, is this input on?';
    }

  });

  document.registerElement('x-extension', XInput);

