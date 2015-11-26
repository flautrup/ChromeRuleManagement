

    function approxEqual(a, b) {
      return assert.equal(Math.round(a), Math.round(b));
    }

    function assertPosition(dropdown, trigger) {
      var dr = dropdown.getBoundingClientRect();
      var tr = trigger.getBoundingClientRect();

      if (dropdown.halign === 'left') {
        approxEqual(dr.left, tr.left);
      } else {
        approxEqual(dr.right, tr.right);
      }

      if (dropdown.valign === 'top') {
        approxEqual(dr.top, tr.top);
      } else {
        approxEqual(dr.bottom, tr.bottom);
      }
    };

    function runAfterEvent(evt, overlay, callback) {
      var listener = function() {
        overlay.removeEventListener(evt, listener)
        callback();
      };
      overlay.addEventListener(evt, listener);
    }

    function runAfterOpen(overlay, callback) {
      runAfterEvent('core-overlay-open-completed', overlay, callback);
    }

    function runAfterClose(overlay, callback) {
      runAfterEvent('core-overlay-close-completed', overlay, callback);
    }

    var d1 = document.getElementById('dropdown1');
    var t1 = document.getElementById('trigger1');

    var d2 = document.getElementById('dropdown2');
    var t2 = document.getElementById('trigger2');

    var d3 = document.getElementById('dropdown3');
    var t3 = document.getElementById('trigger3');

    var d4 = document.getElementById('dropdown4');
    var t4 = document.getElementById('trigger4');

    var d5 = document.getElementById('dropdown5');
    var t5 = document.getElementById('trigger5');

    var d6 = document.getElementById('dropdown6');
    var t6 = document.getElementById('trigger6');

    var d7 = document.getElementById('dropdown7');

    var d8 = document.getElementById('dropdown8');

    var d9 = document.getElementById('dropdown9');

    test('default', function(done) {
      d1.opened = true;
      runAfterOpen(d1, function() {
        assertPosition(d1, t1);
        done();
      });
    });

    test('bottom alignment', function(done) {
      d2.opened = true;
      runAfterOpen(d2, function() {
        assertPosition(d2, t2);
        done();
      });
    });

    test('right alignment', function(done) {
      d3.opened = true;
      runAfterOpen(d3, function() {
        assertPosition(d3, t3);
        done();
      });
    });

    test('layered', function(done) {
      d4.opened = true;
      runAfterOpen(d4, function() {
        assertPosition(d4, t4);
        done();
      });
    });

    test('layered, bottom alignment', function(done) {
      d5.opened = true;
      runAfterOpen(d5, function() {
        assertPosition(d5, t5);
        done();
      });
    });

    test('layered, right alignment', function(done) {
      d6.opened = true;
      runAfterOpen(d6, function() {
        assertPosition(d6, t6);
        done();
      });
    });

    test('can be resized dynamically', function(done) {
      d7.opened = true;
      runAfterOpen(d7, function() {
        var before = d7.getBoundingClientRect();
        d7.opened = false;
        runAfterClose(d7, function() {
          d7.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>";
          d7.opened = true;
          runAfterOpen(d7, function() {
            var after = d7.getBoundingClientRect();
            assert.isTrue(after.height > before.height, "dropdown resizes when content changes")
            done();
          });
        });
      });
    });

    test('can be resized dynamically with sizingTarget', function(done) {
      d8.sizingTarget = d8.querySelector('.scrolling');
      d8.opened = true;
      runAfterOpen(d8, function() {
        var before = d8.getBoundingClientRect();
        d8.opened = false;
        runAfterClose(d8, function() {
          d8.sizingTarget.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>";
          d8.opened = true;
          runAfterOpen(d8, function() {
            var after = d8.getBoundingClientRect();
            assert.isTrue(after.height > before.height, "dropdown resizes when content changes")
            done();
          });
        });
      });
    });

    test('should not toggle opened when dropdown is disabled', function(done) {
      d9.opened = false;
      d9.disabled = true;

      // simulate tap
      d9.fire('tap');
      assert.isFalse(d9.opened);

      // simulate 'enter' keydown
      var keyEvent = new KeyboardEvent('keydown', {charCode: 13});
      d9.dispatchEvent(keyEvent);
      assert.isFalse(d9.opened);

      done();
    });

  