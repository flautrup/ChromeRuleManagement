
    suite('ResolveUrl', function() {

      test('Urls in styles and attributes', function() {
        var el = document.createElement('p-r');
        var rx = /sub\/foo\.z/;
        assert.match(el._styles[0].textContent, rx, 'url not relative to main document');
        assert.match(el.$.div.getAttribute('style'), rx, 'style url not relative to main document');
        assert.match(el.$.img.src, rx, 'src url not relative to main document');
        assert.match(el.$.a.href, rx, 'href url not relative to main document');
        assert.match(el.$.zonk.getAttribute('url'), rx, 'url url not relative to main document');
        assert.notMatch(el.$.rel.href, rx, 'relative href url not relative to main document');
        assert.match(el.$.rel.href, /\?123$/, 'relative href does not preserve query string');
        assert.equal(el.$.action.getAttribute('action'), 'foo.z', 'action attribute relativized for incorrect element type');
        assert.match(el.$.formAction.action, rx, 'action attribute relativized for incorrect element type');
      });

      test('resolveUrl api', function() {
        var el = document.createElement('p-r');
        var expected = document.baseURI.replace(/[?#].*$/, '');
        var actual = el.resolveUrl('../resolveurl.html');
        assert.equal(actual, expected);
      });

      test('resolveUrl api with assetpath', function() {
        var el = document.createElement('p-r-ap');
        // Manually calculate expected URL, to avoid dependence on 
        // URL object for this test for IE! Otherwise, would do this:
        // var importPath = document.querySelector('#elements').href;
        // var expected = new URL('../../assets/Beaker2.jpg', importPath);
        var expected = document.baseURI.replace(/[?#].*$/, '');
        expected = expected.split('/');
        expected.pop();
        expected.pop();
        expected = expected.join('/');
        expected = expected + '/assets/Beaker2.jpg';
        var actual = el.resolveUrl('Beaker2.jpg');
        assert.equal(actual, expected);
      });
    });
  