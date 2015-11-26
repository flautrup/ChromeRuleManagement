
  Polymer({

    is: 'x-configure-gchild',

    behaviors: [configureBehavior],

    properties: {
      content: {
        type: String,
        notify: true,
        observer: 'contentChanged',
        value: 'gchild'
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
