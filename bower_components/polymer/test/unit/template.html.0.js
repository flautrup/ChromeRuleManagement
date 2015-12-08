

  suite('polymer-mini: template', function() {

    test('declarative element template stamped from template previous to script', function() {
      assert.equal(document.querySelector('x-inline').textContent, 'x-inline');
    });

    test('declarative element template stamped from template in dom-module', function() {
      assert.equal(document.querySelector('x-moduley').textContent, 'x-moduley');
    });

    test('imperative element template stamped from template previous to script', function() {
      assert.equal(document.createElement('x-inline').textContent, 'x-inline');
    });

    test('imperative element template stamped from template in dom-module', function() {
      assert.equal(document.createElement('x-moduley').textContent, 'x-moduley');
    });

  });

