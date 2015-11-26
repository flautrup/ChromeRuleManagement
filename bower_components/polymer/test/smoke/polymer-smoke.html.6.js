

  Polymer({

    is: 'x-attributes',

    hostAttributes: 'block',

    properties: {
      attribute: String
    },

    set attribute(attribute) {
      this.$.kind.textContent = attribute;
    }

  });

