
    Polymer({

      is: 'x-custom',

      properties: {
        user: String
      },

      ready: function() {
        this.innerHTML = 'Hello World, my user is ' + (this.user || 'nobody') + '.';
      }

    });
  