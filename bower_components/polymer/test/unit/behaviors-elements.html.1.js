

  Polymer.BehaviorB = {

    properties: {

      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
      }

    },

    _disabledChanged: function(disabled) {
      this.__disabled = disabled
    },

    ready: function() {
      this.__readyB = true;
    }

  }

