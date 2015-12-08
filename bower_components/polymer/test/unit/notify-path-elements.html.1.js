
  Polymer({
    is: 'x-compose',
    properties: {
      obj: {
        type: Object,
        notify: true
      }
    },
    observers: [
      'objSubpathChanged(obj.*)',
      'objValueChanged(obj.value)',
    ],
    created: function() {
      this.observerCounts = {
        objSubpathChanged: 0,
        objValueChanged: 0
      };
    },
    clearObserverCounts: function() {
      for (var i in this.observerCounts) {
        this.observerCounts[i] = 0;
      }
    },
    objSubpathChanged: function(change) {
      this.observerCounts.objSubpathChanged++;
      assert.equal(change.base, this.obj);
      if (this.expectedObjSubpath) {
        assert.equal(change.path, this.expectedObjSubpath);
        assert.equal(change.value, this.expectedObjValue);
      }
    },
    objValueChanged: function(value) {
      this.observerCounts.objValueChanged++;
      assert.equal(this.obj.value, value);
    },
  });
