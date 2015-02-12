

    window.localStorage.setItem('core-localstorage-test', '{"foo":"bar"}');
    var xtest = document.querySelector('x-test');
    
    suite('basic', function() {

      test('initial value', function() {
        assert.isNotNull(xtest.value);
        assert.equal(xtest.value.foo, 'bar');
      });
      
      test('set value', function(done) {
        var newValue = {'foo': 'zot'};
        xtest.value = newValue;
        asyncPlatformFlush(function() {
          var v = window.localStorage.getItem(xtest.$.localstorage.name);
          v = JSON.parse(v);
          assert.equal(v.foo, newValue.foo);
          done();
        });
      });
      
      test('save', function(done) {
        xtest.value.foo = 'quux';
        xtest.$.localstorage.save();
        asyncPlatformFlush(function() {
          var v = window.localStorage.getItem(xtest.$.localstorage.name);
          v = JSON.parse(v);
          assert.equal(v.foo, 'quux');
          done();
        });
      });

    });
    
  