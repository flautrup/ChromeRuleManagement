

    function flushLayoutAndRender(callback) {
      flush(function() {
        document.body.offsetTop;
        requestAnimationFrame(function() {
          callback();
        });
      });
    }

    var d1 = document.getElementById('dropdown1');
    var m1 = document.getElementById('menu1');

    test('shows the label when nothing selected', function(done) {
      m1.selected = null;
      flushLayoutAndRender(function() {
        assert.strictEqual(d1.$.label.textContent, d1.label);
        done();
      });
    });

    test('shows the selected item', function(done) {
      m1.selected = 2;
      flushLayoutAndRender(function() {
        assert.strictEqual(d1.$.label.textContent, m1.selectedItem.textContent);
        done();
      });
    });

    test('can clear the selected item', function(done) {
      m1.selected = 2;
      flushLayoutAndRender(function() {
        assert.strictEqual(d1.$.label.textContent, m1.selectedItem.textContent);

        m1.selected = null;
        flushLayoutAndRender(function() {
          assert.strictEqual(d1.$.label.textContent, d1.label);
          done();
        });
      });
    });

    test('use the valueattr attribute', function(done) {
      m1.valueattr = "foo";
      m1.selected = "l";
      flushLayoutAndRender(function() {
        assert.strictEqual(d1.$.label.textContent, m1.selectedItem.textContent);
        done();
      });
    });

  