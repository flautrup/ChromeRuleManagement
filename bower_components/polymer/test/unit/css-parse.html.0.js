

  function sanitizeCss(text) {
    return text.replace(/[\s]+/g, ' ').trim();
  }

  suite('css-parse', function() {

    setup(function() {
      css = Polymer.CssParse;
      s = document.querySelector('style#test');
      tree = css.parse(s.textContent);
    });

    test('css rules parse', function() {
      assert.equal(tree.rules.length, 4, 'unexpected number of rules');
      assert.equal(tree.rules[2].rules.length, 8, 'unexpected number of rules in keyframes');
      assert.equal(tree.rules[3].rules.length, 1, 'unexpected number of rules in @media');
      console.log('test');
    });

    test('rule selectors parse', function() {
      assert.equal(tree.rules[0].selector, ':host', 'unexpected selector');
      assert.equal(tree.rules[2].selector, '@-webkit-keyframes fill-unfill-rotate', 'unexpected selector in keyframes');
      assert.equal(tree.rules[3].selector, '@media (max-width: 400px)', 'unexpected selector in @media');
    });

    test('rule cssText parse', function() {
      assert.equal(tree.rules[0].cssText, 'background: red;', 'unexpected cssText');
      assert.match(tree.rules[2].cssText, /^12.5%/, 'unexpected cssText in keyframes');
      assert.equal(tree.rules[2].rules[2].cssText, 'transform: rotate(405deg);', 'unexpected cssText in keyframes');
      assert.match(tree.rules[3].cssText, /^div/, 'unexpected cssText in @media');
      assert.equal(tree.rules[3].rules[0].cssText, 'margin-left: 0 !important;', 'unexpected cssText in @media');
    });

    test('rules stringify', function() {
      var orig = sanitizeCss(s.textContent);
      var result = sanitizeCss(css.stringify(tree));
      assert.equal(result, orig, 'unexpected stringified output');
    });

    test('parse correctly ignores @import and comments', function() {
      var s2 = document.querySelector('#test-ignore');
      var t = css.parse(s2.textContent);
      assert.equal(t.rules[0].selector, '.stuff', 'unexpected rule selector');
      assert.equal(t.rules[0].cssText, 'background: red;', 'unexpected rule cssText');
      var result = sanitizeCss(css.stringify(t));
      assert.equal(result, '.stuff { background: red; }', 'unexpected stringified output');
    });

  });
