

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

    test('aria-disabled is set', function(done) {
      assert.ok(!d1.hasAttribute('aria-disabled'));
      d1.setAttribute('disabled', '');
      flush(function() {
        assert.ok(d1.hasAttribute('aria-disabled'));
        d1.removeAttribute('disabled');
        done();
      });
    });

  