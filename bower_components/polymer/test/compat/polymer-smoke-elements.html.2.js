

  Polymer({

    is: 'x-cheapgood-nodes',

    features: function() {
      // use template feature
      this.stampTemplate();
      // use `nodes` feature
      this.marshalNodeReferences();
    },

    created: function() {
      // `nodes` features populates `$` map from id's in the template
      this.$.exclaim.textContent = 'Hey';
    }

  });

