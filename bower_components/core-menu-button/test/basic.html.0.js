

    function flushLayoutAndRender(callback) {
      flush(function() {
        document.body.offsetTop;
        requestAnimationFrame(function() {
          callback();
        });
      });
    }

    var b1 = document.getElementById('button1');
    var m1 = document.getElementById('menu1');

    test('default', function() {
      // it renders!
      assert.ok(true);
    });

  