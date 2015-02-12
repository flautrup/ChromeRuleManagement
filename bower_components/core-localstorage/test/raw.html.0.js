

    window.localStorage.setItem('core-localstorage-test', 'hello world');
    var storage = document.querySelector('#localstorage');
    
    suite('basic', function() {

      test('load', function() {
        assert.equal(storage.value, 'hello world');
      });
      
      test('save', function(done) {
        var m = 'goodbye';
        storage.value = m;
        asyncPlatformFlush(function() {
          var v = window.localStorage.getItem(storage.name);
          assert.equal(v, m);
          done();
        });
      });

    });

  