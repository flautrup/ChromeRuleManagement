

  Polymer({

    is: 'x-simple',

    listeners: {
      click: 'clickAction',
      'exclaim.click': 'exclaimClickAction'
    },

    created: function() {
      this.$.exclaim.textContent = 'Hey';
    },

    clickAction: function() {
      this.style.backgroundColor = 'lightblue';
    },

    exclaimClickAction: function(e) {
      e.stopPropagation();
      this.style.backgroundColor = 'orange';
    }

  });

