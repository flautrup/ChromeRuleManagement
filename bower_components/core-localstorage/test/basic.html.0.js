

    window.localStorage.setItem('core-localstorage-test', '{"foo":"bar"}');
    var storage = document.querySelector('#localstorage');
    
    suite('basic', function() {

      test('load', function() {
        assert.isNotNull(storage.value);
        assert.equal(storage.value.foo, 'bar');
      });
      
      test('save', function(done) {
        var newValue = {'foo': 'zot'};
        storage.value = newValue;
        asyncPlatformFlush(function() {
          var v = window.localStorage.getItem(storage.name);
          v = JSON.parse(v);
          assert.equal(v.foo, newValue.foo);
          done();
        });
      });

    });

  