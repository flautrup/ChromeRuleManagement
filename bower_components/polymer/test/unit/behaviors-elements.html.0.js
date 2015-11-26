

  Polymer.BehaviorA = {

    properties: {

      label: {
        type: String,
        observer: '_labelChanged'
      }

    },

    listeners: {
      change: '_changeHandler'
    },

    ready: function() {
      this.__readyA = true;
    },

    _labelChanged: function(label) {
      this.__label = label;
    },

    _changeHandler: function(e) {
      this.__change = e.detail.value;
    }

  }

