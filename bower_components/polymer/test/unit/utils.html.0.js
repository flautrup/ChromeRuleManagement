
  
  before(function() {
    Polymer({is: 'my-element'});
  });

  beforeEach(function() {
    window.el1 = document.createElement('my-element');
    document.body.appendChild(window.el1);
    window.el2 = document.createElement('my-element');
    window.el1.appendChild(window.el2);
  });

  afterEach(function() {
    document.body.removeChild(window.el1);
    delete window.el1;
    delete window.el2;
  });

  suite('CSS utilities', function() {

    test('toggleClass', function() {

      window.el1.toggleClass('foo-class', true);
      assert(window.el1.classList.contains('foo-class'));
      window.el1.toggleClass('foo-class', false);
      assert(!window.el1.classList.contains('foo-class'));
      window.el1.toggleClass('foo-class');
      assert(window.el1.classList.contains('foo-class'));
      window.el1.toggleClass('foo-class');
      assert(!window.el1.classList.contains('foo-class'));

      window.el1.toggleClass('foo-class', true, window.el2);
      assert(window.el2.classList.contains('foo-class'));
      window.el1.toggleClass('foo-class', false, window.el2);
      assert(!window.el2.classList.contains('foo-class'));
    });

  });

  suite('debounce', function() {

    test('debounce (no-wait)', function(done) {

      var called = 0;
      var cb = function() {
        called++;
      };

      window.el1.debounce('foo', cb);
      window.el1.debounce('foo', cb);
      window.el1.debounce('foo', cb);

      setTimeout(function() {
        assert.equal(called, 1, 'debounce should be called exactly once');
        done();
      }, 50);

    });

    test('debounce (wait)', function(done) {

      var called = 0;
      var now = Date.now();
      var cb = function() {
        called++;
      };

      window.el1.debounce('foo', cb);
      window.el1.debounce('foo', cb, 100);
      window.el1.debounce('foo', cb, 100);

      setTimeout(function() {
        assert.equal(called, 1, 'debounce should be called exactly once');
        assert(Date.now() - now > 100, 'debounce should be called after at least 100ms');
        done();
      }, 200);

    });

  });

