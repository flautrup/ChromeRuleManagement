

  Polymer({

    is: 'x-trivial',

    ready: function() {
      this.value = 'spoo';
    },

    inputChange: function(e) {
      this.value = e.target.value;
    }

  });

