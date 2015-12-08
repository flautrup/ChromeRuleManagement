
  Polymer({
    is: 'x-reflect',
    properties: {
      reflectedobject: {
        type: Object,
        reflectToAttribute: true
      },
      reflectedarray: {
        type: Array,
        reflectToAttribute: true
      },
      reflectedNumber: {
        type: Number,
        reflectToAttribute: true
      },
      reflectedstring: {
        type: String,
        reflectToAttribute: true
      },
      reflectedboolean: {
        type: Boolean,
        reflectToAttribute: true
      },
      reflecteddate: {
        type: Date,
        reflectToAttribute: true
      }
    }
  });
