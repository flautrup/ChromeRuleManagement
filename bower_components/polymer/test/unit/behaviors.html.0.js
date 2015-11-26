

suite('single behavior element', function() {

  var el;

  setup(function() {
    el = document.createElement('single-behavior');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('ready from behavior', function() {
    assert.equal(el.__readyA, true);
  });

  test('properties from behavior', function() {
    el.label = 'foo';
    assert.equal(el.__label, 'foo');
  });

  test('listener from behavior', function() {
    el.fire('change', {value: 'bar'});
    assert.equal(el.__change, 'bar');
  });

});

suite('multi-behaviors element', function() {

  var el;

  setup(function() {
    el = document.createElement('multi-behaviors');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('ready from behaviors', function() {
    assert.equal(el.__readyA, true);
    assert.equal(el.__readyB, true);
  });

  test('properties from behaviors', function() {
    el.label = 'foo';
    assert.equal(el.__label, 'foo');
    el.disabled = true;
    assert.equal(el.__disabled, true);
  });

  test('properties from itself', function() {
    assert.isDefined(el._setFoo, 'readOnly setter not available');
    el._setFoo('bar');
    assert.equal(el.__foo, 'bar', 'observer not getting called');
    assert.equal(el.getAttribute('foo'), 'bar', 'not getting reflected');
  });

  test('listener from behaviors', function() {
    el.fire('change', {value: 'bar'});
    assert.equal(el.__change, 'bar');
  });

});

