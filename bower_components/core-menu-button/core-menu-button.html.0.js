

  var p = {

    overlayListeners: {
      'core-overlay-open': 'openAction',
      'core-activate': 'activateAction'
    },

    activateAction: function() {
      this.opened = false;
    }

  };

  Polymer.mixin2(p, Polymer.CoreFocusable);
  Polymer(p);

