
  Polymer({
    is: 'x-app',
    tapHandler: function(e) {
      this._testLocalTarget = Polymer.dom(e).localTarget;
      this._testRootTarget = Polymer.dom(e).rootTarget;
    }
  });
