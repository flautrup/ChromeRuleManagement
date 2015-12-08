

    suite('x-style', function() {

      suiteSetup(function() {
    
        Polymer({
          is: 'x-bar'
        });

        Polymer({
          is: 'x-foo'
        });

        xBar = document.querySelector('x-bar');
        xFoo = document.querySelector('x-foo');

      });

      test('root styles applied', function() {
        assertComputed(xBar, '1px');
      });

      test('root styles have lower bound encapsulation', function() {
        assertComputed(xFoo.$.bar1, '0px');
      });

      test('::shadow styles applied', function() {
        assertComputed(xFoo.$.bar2, '2px');
      });

    });

    function assertComputed(element, value) {
      var computed = getComputedStyle(element);
      assert.equal(computed['border-top-width'], value, 'computed style incorrect');
    }

  