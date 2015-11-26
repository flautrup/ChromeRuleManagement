

  Polymer({

    is: 'x-trivial',

    // stubbing out `features` gives us maximum vanilla

    features: function() {
    },

    // These lifecycle callbacks are non-standard: the standard callbacks are
    // all suffixed by `Callback`. We reserve the native callbacks for system
    // processing in Base and supply the shorter names for individual elements
    // to override as necessary.

    created: function() {
      this.innerHTML = '<i>Hey</i>, is this script <b>on</b>?';
    },

    // these lifecycle callbacks are also available

    attached: function() {
    },

    detached: function() {
    },

    attributeChanged: function(name) {
    }

  });

