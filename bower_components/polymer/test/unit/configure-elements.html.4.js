
  Polymer({

    is: 'x-configure-host',

    behaviors: [configureBehavior],

    properties: {
      content: {
        type: String,
        notify: true,
        observer: 'contentChanged',
        value: 'host'
      },
      object: {
        type: Object,
        notify: true,
        value: function() { return {goo: {foo: 'obj-host'}}; },
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
