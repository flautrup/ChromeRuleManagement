
      Polymer('progress-test', {
        loading: true,
        i: 0,
        numbytes: 1000,
        pretty: function(i) {
          return JSON.stringify(i, null, 2);
        },
        restart: function() {
          this.$.ajax.abort();
          this.$.ajax.go();
        }
      });
    