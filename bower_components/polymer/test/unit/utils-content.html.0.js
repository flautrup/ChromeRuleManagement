
    
    suite('content utils', function() {
      
      var elt1 = document.querySelector('#elt1');
      var elt2 = document.querySelector('#elt2');
      var elt3 = document.querySelector('#elt3');
      
      test('getContentChildNodes (empty)', function() {
        var nodes = elt1.getContentChildNodes();
        assert.equal(nodes.length, 1, 'should have 1 text node');
      });
      
      test('getContentChildren (empty)', function() {
        var nodes = elt1.getContentChildren();
        assert.equal(nodes.length, 0, 'should have no children');
      });
  
      test('getContentChildNodes', function() {
        var nodes = elt2.getContentChildNodes();
        assert.equal(nodes.length, 7, 'should have 7 nodes (text nodes + divs)');
      });
      
      test('getContentChildren', function() {
        var nodes = elt2.getContentChildren();
        assert.equal(nodes.length, 3, 'should have 3 divs');
      });
      
      test('getContentChildNodes with selector', function() {
        var nodes = elt3.getContentChildNodes('[select=div]');
        assert.equal(nodes.length, 3, 'should have 3 divs');
        nodes = elt3.getContentChildNodes('[select=span]');
        assert.equal(nodes.length, 4, 'should have 4 spans');
      });
      
      test('getContentChildren with selector', function() {
        var nodes = elt3.getContentChildren('[select=div]');
        assert.equal(nodes.length, 3, 'should have 3 divs');
        nodes = elt3.getContentChildren('[select=span]');
        assert.equal(nodes.length, 4, 'should have 4 spans');
      });
      
    });
  
  