
  
  beforeEach(function() {
    window.Async = Polymer.Async;
  });

  afterEach(function() {
    delete window.Async;
  });

  suite('no-wait async', function() {

    test('async runs', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      Async.run(callback);
      setTimeout(function() {
        assert.equal(called, 1);
        done();
      });
    });

    test('multiple asyncs of same fn run', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      Async.run(callback);
      Async.run(callback);
      Async.run(callback);
      setTimeout(function() {
        assert.equal(called, 3);
        done();
      });
    });

    test('multiple asyncs of different fns run', function(done) {
      var called1 = 0;
      var called2 = 0;
      var called3 = 0;
      var callback1 = function() {
        called1++;
      };
      var callback2 = function() {
        called2++;
      };
      var callback3 = function() {
        called3++;
      };
      Async.run(callback1);
      Async.run(callback2);
      Async.run(callback3);
      setTimeout(function() {
        assert.equal(called1, 1);
        assert.equal(called2, 1);
        assert.equal(called3, 1);
        done();
      });
    });

  });

  suite('cancel no-wait async', function() {

    test('async cancels', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      var h = Async.run(callback);
      Async.cancel(h);
      setTimeout(function() {
        assert.equal(called, 0);
        done();
      });
    });

    test('multiple asyncs of same fn cancel', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      var h = [];
      h.push(Async.run(callback));
      h.push(Async.run(callback));
      h.push(Async.run(callback));
      Async.cancel(h.pop());
      Async.cancel(h.pop());
      Async.cancel(h.pop());
      setTimeout(function() {
        assert.equal(called, 0);
        done();
      });
    });

    test('multiple asyncs of different fns cancel', function(done) {
      var called1 = 0;
      var called2 = 0;
      var called3 = 0;
      var callback1 = function() {
        called1++;
      };
      var callback2 = function() {
        called2++;
      };
      var callback3 = function() {
        called3++;
      };
      var h1 = Async.run(callback1);
      var h2 = Async.run(callback2);
      var h3 = Async.run(callback3);
      Async.cancel(h1);
      Async.cancel(h3);
      setTimeout(function() {
        assert.equal(called1, 0);
        assert.equal(called2, 1);
        assert.equal(called3, 0);
        done();
      });
    });

  });

  suite('wait async', function() {

    test('async runs', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      Async.run(callback, 50);
      setTimeout(function() {
        assert.equal(called, 1);
        done();
      }, 51);
    });

    test('multiple asyncs of same fn run', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      Async.run(callback, 50);
      Async.run(callback, 50);
      Async.run(callback, 200);
      setTimeout(function() {
        assert.equal(called, 2);
        done();
      }, 51);
    });

    test('multiple asyncs of different fns run', function(done) {
      var called1 = 0;
      var called2 = 0;
      var called3 = 0;
      var callback1 = function() {
        called1++;
      };
      var callback2 = function() {
        called2++;
      };
      var callback3 = function() {
        called3++;
      };
      Async.run(callback1, 50);
      Async.run(callback2, 50);
      Async.run(callback3, 200);
      setTimeout(function() {
        assert.equal(called1, 1);
        assert.equal(called2, 1);
        assert.equal(called3, 0);
        done();
      }, 51);
    });

  });

  suite('cancel wait async', function() {

    test('async cancels', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      var h = Async.run(callback, 50);
      Async.cancel(h);
      setTimeout(function() {
        assert.equal(called, 0);
        done();
      }, 51);
    });

    test('multiple asyncs of same fn cancel', function(done) {
      var called = 0;
      var callback = function() {
        called++;
      };
      var h = [];
      h.push(Async.run(callback, 50));
      h.push(Async.run(callback, 50));
      h.push(Async.run(callback, 200));
      Async.cancel(h.pop());
      Async.cancel(h.pop());
      Async.cancel(h.pop());
      setTimeout(function() {
        assert.equal(called, 0);
        done();
      }, 51);
    });

    test('multiple asyncs of different fns cancel', function(done) {
      var called1 = 0;
      var called2 = 0;
      var called3 = 0;
      var callback1 = function() {
        called1++;
      };
      var callback2 = function() {
        called2++;
      };
      var callback3 = function() {
        called3++;
      };
      var h1 = Async.run(callback1, 50);
      var h2 = Async.run(callback2, 50);
      var h3 = Async.run(callback3, 200);
      Async.cancel(h1);
      Async.cancel(h3);
      setTimeout(function() {
        assert.equal(called1, 0);
        assert.equal(called2, 1);
        assert.equal(called3, 0);
        done();
      }, 51);
    });

  });

