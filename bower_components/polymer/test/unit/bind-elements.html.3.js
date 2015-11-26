
  Polymer({
    is: 'x-notifies1',
    properties: {
      notifies: {
        notify: true
      }
    },
    ready: function() {
      this.notifies = 'readyValue';
    }
  });
