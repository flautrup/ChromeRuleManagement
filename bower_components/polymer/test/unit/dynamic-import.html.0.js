
  
  suite('dynamic imports', function() {

    test('use importHref to load and create an element', function(done) {
      var d = document.querySelector('dynamic-element');
      d.whenDynamicContentReady(function() {
        assert(d._readied, true, 'dynamic element not readied');
        assert.ok(d.$.content, 'dynamic element does not have content');
        assert(d.$.outer._readied, true, 'dynamic sub-element not readied');
        assert.ok(d.$.outer.$.content, 'dynamic sub-element does not have content');
        assert(d.$.outer.$.inner._readied, true, 'dynamic sub-element not readied');
        assert.ok(d.$.outer.$.inner.$.content, 'dynamic sub-element does not have content');
        done();
      });
    });

  });

