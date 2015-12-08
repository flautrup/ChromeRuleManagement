

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

    var b2 = document.getElementById('button2');

    test('default', function() {
      // it renders!
      assert.ok(true);
    });

    test('HTML disabled attribute should bind downwards', function() {
      assert.equal(true, b2.disabled);
    });

  