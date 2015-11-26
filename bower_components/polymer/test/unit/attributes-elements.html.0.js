
  Polymer({
    is: 'x-basic',
    hostAttributes: {
      attr1: 'this is attr 1',
      attr2: 42,
      'aria-role': 'button',
      title: 'awesome',
      'attr-object': {foo: 'bar', nested: {'meaning': 42}, arr: [0, 'foo', true]},
      'attr-stupid': false,
      class: 'foo bar baz'
    },
    properties: {
      object: {
        type: Object,
        value: function() { return {}; }
      },
      array: {
        type: Array,
        value: function() { return []; }
      },
      number: {
        type: Number,
        value: 0
      },
      string: {
        type: String,
        value: 'none'
      },
      bool: {
        type: Boolean,
        value: true
      },
      negBool: {
        type: Boolean,
        value: false
      },
      date: {
        type: Date,
        value: function() { return new Date(0); }
      },
      dashCase: {
        type: String,
        value: 'none'
      },
      noType: {
        value: 'none'
      },
      readOnly: {
        type: String,
        value: 'default',
        readOnly: true
      }
    }
  });
