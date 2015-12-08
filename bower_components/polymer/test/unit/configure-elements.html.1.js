
  Polymer({

    is: 'x-configure-value',

    behaviors: [configureBehavior],

    properties: {
      content: {
        type: String,
        notify: true,
        observer: 'contentChanged',
        value: 'default'
      },
      object: {
        type: Object,
        notify: true,
        value: function() { return {foo: 'obj-default'}; },
        observer: 'objectChanged'
      },
      readOnly: {
        readOnly: true,
        value: 'default'
      },
      stomp: {
        value: 5
      }
    }

  });
