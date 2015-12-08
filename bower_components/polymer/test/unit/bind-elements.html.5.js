
  Polymer({
    is: 'x-notifies3',
    properties: {
      shouldNotChange: {
        observer: 'shouldNotChangeChanged'
      }
    },
    shouldNotChangeChanged: function() { }
  });
