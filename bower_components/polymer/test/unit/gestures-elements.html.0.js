
  Polymer({
    is: 'x-foo',
    tapHandler: function(e) {
      this._testLocalTarget = Polymer.dom(e).localTarget;
      this._testRootTarget = Polymer.dom(e).rootTarget;
    }
  });
