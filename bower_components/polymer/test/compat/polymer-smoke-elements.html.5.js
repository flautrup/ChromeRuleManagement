

  Polymer({

    is: 'x-fancy-bind',

    properties: {
      // property: target (set property is pushed to $.<target>[.textContent])
      exclaim: {
        observer: 'exclaim'
      },
      state: {
        observer: 'state'
      }
    },

    listeners: {
      click: 'clickAction'
    },

    created: function() {
      // NOTE: binding feature turns on automatically at prototype level, if
      // you include a `bind` object in your prototype.
      // These properties automatically propagate to DOM as defined
      // by the `bind` object.
      this.exclaim = 'Hey';
      this.state = 'on';
    },

    clickAction: function() {
      this.state = 'LIVE';
    }

  });

