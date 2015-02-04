

    var fake = new Fake();

    function cloneAndAppendTemplate(templateId) {
      var tmpl = document.getElementById(templateId);
      var frag = document.importNode(tmpl.content, true);
      var node = frag.children[0];
      document.body.appendChild(frag);
      return {
        d: node,
        i: node.querySelector('input')
      };
    }

    test('label is invisible if value is not null', function() {
      var nodes = cloneAndAppendTemplate('default');
      nodes.i.value = 'foobar';
      nodes.d.updateLabelVisibility(nodes.i.value);
      assert.ok(!nodes.d._labelVisible);
    });

    test('label is invisible if floating label and focused', function(done) {
      var nodes = cloneAndAppendTemplate('floating-label');
      async.series([
        function(callback) {
          ensureFocus(nodes.i, callback);
        },
        function(callback) {
          assert.ok(!nodes.d._labelVisible);
          callback();
        }
      ], done);
    });


    test('label is invisible if value = 0', function() {
      var nodes = cloneAndAppendTemplate('default');
      nodes.i.value = 0;
      nodes.d.updateLabelVisibility(nodes.i.value);
      assert.ok(!nodes.d._labelVisible);
    });

    test('labelVisible overrides label visibility', function() {
      var nodes = cloneAndAppendTemplate('default');
      nodes.d.labelVisible = false;
      assert.ok(!nodes.i.value);
      assert.ok(!nodes.d._labelVisible);
    });

    test('labelVisible works in an attribute', function() {
      var nodes = cloneAndAppendTemplate('label-visible-false');
      assert.ok(!nodes.d._labelVisible);
    });

    test('can create inputs lazily', function() {
      var nodes = cloneAndAppendTemplate('no-input');
      var input = document.createElement('input');
      input.value = 'foobar';
      nodes.d.appendChild(input);
      assert.ok(!nodes.d._labelVisible);
    });

    test('tapping on floating label focuses input', function(done) {
      var nodes = cloneAndAppendTemplate('floating-label-filled');
      var floatedLabel = nodes.d.shadowRoot.querySelector('.floated-label');
      fake.downOnNode(floatedLabel);
      fake.upOnNode(floatedLabel);
      waitFor(function() {
        assertNodeHasFocus(nodes.i);
      }, done);
    });

    test('floating label and the error message are the same color', function(done) {
      var nodes = cloneAndAppendTemplate('error');
      flush(function() {
        var s1 = getComputedStyle(nodes.d.$.floatedLabelText);
        var s2 = getComputedStyle(nodes.d.shadowRoot.querySelector('.error-text'));
        assert.strictEqual(s1.color, s2.color);
        done();
      });
    });

    test('auto-validate input validates after creation', function() {
      var nodes = cloneAndAppendTemplate('auto-validate');
      flush(function() {
        assert.ok(nodes.d.isInvalid);
      });
    });

    suite('a11y', function() {

      test('aria-label set on input', function() {
        var nodes = cloneAndAppendTemplate('default');
        flush(function() {
          assert.strictEqual(nodes.i.getAttribute('aria-label'), nodes.d.label);
        });
      });

    });

  