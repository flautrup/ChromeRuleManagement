
  Polymer({
    is: 'x-stuff',
    properties: {
      computedFromPaths: {
        computed: 'computeFromPaths(a, nested.b, nested.obj.c)'
      }
    },
    observers: [
      'nestedSubpathChanged(nested.*)',
      'nestedObjChanged(nested.obj)',
      'nestedObjSubpathChanged(nested.obj.*)',
      'nestedObjValueChanged(nested.obj.value)',
      'multipleChanged(a, b, nested.obj.*)',
      'multiplePathsChanged(a, nested.b, nested.obj.c)'
    ],
    created: function() {
      this.observerCounts = {
        nestedSubpathChanged: 0,
        nestedObjChanged: 0,
        nestedObjSubpathChanged: 0,
        nestedObjValueChanged: 0,
        multipleChanged: 0,
        multiplePathsChanged: 0
      };
    },
    clearObserverCounts: function() {
      for (var i in this.observerCounts) {
        this.observerCounts[i] = 0;
      }
      this.$.compose.clearObserverCounts();
      this.$.forward.clearObserverCounts();
    },
    nestedSubpathChanged: function(change) {
      this.observerCounts.nestedSubpathChanged++;
      assert.equal(change.base, this.nested);        
      if (this.expectedNestedSubpath) {
        assert.equal(change.path, this.expectedNestedSubpath);
        assert.equal(change.value, this.expectedNestedValue);
      }
    },
    nestedObjChanged: function(value) {
      this.observerCounts.nestedObjChanged++;
      assert.equal(this.nested.obj, value);
    },
    nestedObjSubpathChanged: function(change) {
      this.observerCounts.nestedObjSubpathChanged++;
      assert.equal(change.base, this.nested.obj);        
      if (this.expectedNestedObjSubpath) {
        assert.equal(change.path, this.expectedNestedObjSubpath);
        assert.equal(change.value, this.expectedNestedObjValue);
      }
    },
    nestedObjValueChanged: function(value) {
      this.observerCounts.nestedObjValueChanged++;
      assert.equal(this.nested.obj.value, value);
    },
    multipleChanged: function(a, b, nestedObjChange) {
      this.observerCounts.multipleChanged++;
      assert.equal(a, 'a');
      assert.equal(b, 'b');
      assert.equal(nestedObjChange.base, this.nested.obj);
      if (this.expectedNestedObjSubpath) {
        assert.equal(nestedObjChange.path, this.expectedNestedObjSubpath);
        assert.equal(nestedObjChange.value, this.expectedNestedObjValue);
      }
      assert.equal(nestedObjChange.base, this.nested.obj);        
    },
    computeFromPaths: function(a, b, c) {
      assert.equal(a, this.a, 'computeFromNested `a` arg incorrect');
      assert.equal(b, this.nested.b, 'computeFromNested `b` arg incorrect');
      assert.equal(c, this.nested.obj.c, 'computeFromNested `c` arg incorrect');
      return a + b + c;
    },
    multiplePathsChanged: function(a, b, c) {
      this.observerCounts.multiplePathsChanged++;
      assert.equal(a, this.a, 'specificMultipleChanged `a` arg incorrect');
      assert.equal(b, this.nested.b, 'specificMultipleChanged `b` arg incorrect');
      assert.equal(c, this.nested.obj.c, 'specificMultipleChanged `c` arg incorrect');
    }
  });
