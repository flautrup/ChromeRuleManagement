
  Polymer({
    is: 'x-nested-repeat',
    testHandler1Count: 0,
    testHandler2Count: 0,
    testHandler3Count: 0,
    testHandler1: function() {
      this.testHandler1Count++;
    },
    testHandler2: function() {
      this.testHandler2Count++;
    },
    testHandler3: function() {
      this.testHandler3Count++;
    }
  });
