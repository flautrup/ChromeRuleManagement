
  var configureList = [];
  var readyList = [];
  
  function clearTestLists() {
    configureList = [];
    readyList = [];
  }

  var readyBehavior = {
    moniker: function() {
      return this.is + (this.id ? '#' + this.id : '')
    },
    // use private, stateful, method for testing purposes
    _configure: function() {
      assert.isTrue(!this.isAttached, 'Element should not be attached when configured.');
      configureList.push(this.moniker());
    },
    ready: function() {
      readyList.push(this.moniker());
    },

    attached: function() {
      assert.isTrue(this._readied, 'Element not ready when attached');
    }
  };
