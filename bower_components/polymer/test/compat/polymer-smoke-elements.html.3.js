

  Polymer({

    is: 'x-cheapgood-listeners',

    listeners: {
      click: 'clickAction',
      'exclaim.click': 'exclaimClickAction'
    },

    features: function() {
      // use template feature
      this.stampTemplate();
      // use `nodes` feature
      this.marshalNodeReferences();
      // use `listeners` feature
      this.listenListeners();
    },

    clickAction: function() {
      this.style.backgroundColor = 'lightblue';
    },

    exclaimClickAction: function(e) {
      e.stopPropagation();
      this.style.backgroundColor = 'orange';
    }

  });

