
  Polymer({
    is: 'x-styled',

    properties: {
      items: {value: [{}]}
    },

    computeClass: function(className) {
      return className;
    }

  });
