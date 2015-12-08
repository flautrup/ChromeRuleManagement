

var configuredObject = {foo: 'bar', nested: {'meaning': 42}, arr: [0, 'foo', true]};
var configuredArray = [0, 'foo', true, {foo: 'bar'}];
var configuredNumber = 42;
var configuredString = "The quick brown fox";
var configuredNoType = "Should be String";
var configuredTime = 1425494765000;

suite('create-time deserialization', function() {

  test('basic default values', function() {
    assert.deepEqual(basicDefault.object, {});
    assert.deepEqual(basicDefault.array, []);
    assert.strictEqual(basicDefault.number, 0);
    assert.strictEqual(basicDefault.string, 'none');
    assert.strictEqual(basicDefault.bool, true);
    assert.strictEqual(basicDefault.negBool, false);
    assert.strictEqual(basicDefault.date.getTime(), 0);
    assert.strictEqual(basicDefault.dashCase, 'none');
    assert.strictEqual(basicDefault.noType, 'none');
    assert.strictEqual(basicDefault.readOnly, 'default');
  });

  test('basic deserialize attributes', function() {
    assert.deepEqual(basicConfigured.object, configuredObject);
    assert.deepEqual(basicConfigured.array, configuredArray);
    assert.strictEqual(basicConfigured.number, configuredNumber);
    assert.strictEqual(basicConfigured.string, configuredString);
    assert.strictEqual(basicConfigured.bool, true);
    assert.strictEqual(basicConfigured.negBool, false);
    assert.strictEqual(basicConfigured.date.getTime(), configuredTime);
    assert.strictEqual(basicConfigured.dashCase, configuredString);
    assert.strictEqual(basicConfigured.noType, configuredNoType);
    assert.strictEqual(basicConfigured.readOnly, 'default');
  });

  test('reflected default values', function() {
    assert.deepEqual(reflectDefault.object, {});
    assert.deepEqual(reflectDefault.array, []);
    assert.strictEqual(reflectDefault.number, 0);
    assert.strictEqual(reflectDefault.string, 'none');
    assert.strictEqual(reflectDefault.bool, true);
    assert.strictEqual(reflectDefault.negBool, false);
    assert.strictEqual(reflectDefault.date.getTime(), 0);
    assert.strictEqual(reflectDefault.dashCase, 'none');
    assert.strictEqual(reflectDefault.noType, 'none');
    assert.strictEqual(reflectDefault.readOnly, 'default');
  });

  test('reflected deserialize attributes', function() {
    assert.deepEqual(reflectConfigured.object, configuredObject);
    assert.deepEqual(reflectConfigured.array, configuredArray);
    assert.strictEqual(reflectConfigured.number, configuredNumber);
    assert.strictEqual(reflectConfigured.string, configuredString);
    assert.strictEqual(reflectConfigured.bool, true);
    assert.strictEqual(reflectConfigured.negBool, false);
    assert.strictEqual(reflectConfigured.date.getTime(), configuredTime);
    assert.strictEqual(reflectConfigured.dashCase, configuredString);
    assert.strictEqual(reflectConfigured.noType, configuredNoType);
    assert.strictEqual(reflectConfigured.readOnly, 'default');
  });

});

suite('imperative attribute change (no-reflect)', function() {

  var el;

  setup(function() {
    el = document.createElement('x-basic');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('basic change object attribute', function() {
    el.setAttribute('object', '{"foo": "bar", "nested": {"meaning": 42}, "arr": [0, "foo", true]}');
    assert.deepEqual(el.object, configuredObject);
  });

  test('basic change array attribute', function() {
    el.setAttribute('array', '[0, "foo", true, {"foo": "bar"}]');
    assert.deepEqual(el.array, configuredArray);
  });

  test('basic change number attribute', function() {
    el.setAttribute('number', 42);
    assert.strictEqual(el.number, 42);
  });

  test('basic change string attribute', function() {
    el.setAttribute('string', 'howdy');
    assert.strictEqual(el.string, 'howdy');
  });

  test('basic change boolean attribute true', function() {
    el.setAttribute('bool', '');
    assert.strictEqual(el.bool, true);
  });

  test('basic change boolean attribute truthy', function() {
    el.setAttribute('bool', 'sure!');
    assert.strictEqual(el.bool, true);
  });

  test('basic change boolean attribute false', function() {
    el.setAttribute('bool', '');
    assert.strictEqual(el.bool, true);
    el.removeAttribute('bool');
    assert.strictEqual(el.bool, false);
  });

  test('basic change dashCase attribute', function() {
    el.setAttribute('dash-case', 'Changed');
    assert.strictEqual(el.dashCase, 'Changed');
  });

});

suite('imperative attribute change (reflect)', function() {

  var el;

  setup(function() {
    el = document.createElement('x-reflect');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('basic change object attribute', function() {
    el.setAttribute('object', '{"foo": "bar", "nested": {"meaning": 42}, "arr": [0, "foo", true]}');
    assert.deepEqual(el.object, configuredObject);
  });

  test('basic change array attribute', function() {
    el.setAttribute('array', '[0, "foo", true, {"foo": "bar"}]');
    assert.deepEqual(el.array, configuredArray);
  });

  test('basic change number attribute', function() {
    el.setAttribute('number', 42);
    assert.strictEqual(el.number, 42);
  });

  test('basic change string attribute', function() {
    el.setAttribute('string', 'howdy');
    assert.strictEqual(el.string, 'howdy');
  });

  test('basic change boolean attribute true', function() {
    el.setAttribute('bool', '');
    assert.strictEqual(el.bool, true);
  });

  test('basic change boolean attribute truthy', function() {
    el.setAttribute('bool', 'sure!');
    assert.strictEqual(el.bool, true);
  });

  test('basic change boolean attribute false', function() {
    el.setAttribute('bool', '');
    assert.strictEqual(el.bool, true);
    el.removeAttribute('bool');
    assert.strictEqual(el.bool, false);
  });

  test('basic change dashCase attribute', function() {
    el.setAttribute('dash-case', 'Changed');
    assert.strictEqual(el.dashCase, 'Changed');
  });

  test('change non-`properties` property that natively reflects', function() {
    el.title = 'awesome';
    assert.strictEqual(el.title, 'awesome');
    el.title = '';
    assert.strictEqual(el.title, '');
    el.setAttribute('title', 'super');
    assert.strictEqual(el.title, 'super');
    el.removeAttribute('title');
    assert.strictEqual(el.title, '');
  });

});

suite('hostAttributes', function() {

  test('hostAttributes set correctly', function() {
    assert.strictEqual(basicDefault.getAttribute('attr1'), 'this is attr 1');
    assert.strictEqual(basicDefault.getAttribute('attr2'), '42');
    assert.strictEqual(basicDefault.getAttribute('aria-role'), 'button');
    assert.strictEqual(basicDefault.getAttribute('title'), 'awesome');
    assert.strictEqual(basicDefault.title, 'awesome');
    assert.equal(basicDefault.getAttribute('attr-object'),
      JSON.stringify(configuredObject));
    assert.equal(basicDefault.hasAttribute('attr-stupid'), false);
    assert(basicDefault.classList.contains('foo'));
    assert(basicDefault.classList.contains('bar'));
    assert(basicDefault.classList.contains('baz'));
  });

  test('hostAttributes set correctly in composed element', function() {
    assert.strictEqual(compose.$.basic.getAttribute('attr1'), 'this is attr 1');
    assert.strictEqual(compose.$.basic.getAttribute('attr2'), '42');
    assert.strictEqual(compose.$.basic.getAttribute('aria-role'), 'button');
    assert.strictEqual(compose.$.basic.getAttribute('title'), 'awesome');
    assert.strictEqual(compose.$.basic.title, 'awesome');
    assert.equal(compose.$.basic.getAttribute('attr-object'),
      JSON.stringify(configuredObject));
    assert.equal(compose.$.basic.hasAttribute('attr-stupid'), false);
    assert(compose.$.basic.classList.contains('foo'));
    assert(compose.$.basic.classList.contains('bar'));
    assert(compose.$.basic.classList.contains('baz'));
    if (!Polymer.Settings.useNativeShadow) {
      assert(compose.$.basic.classList.contains('style-scope'));
      assert(compose.$.basic.classList.contains('x-compose'));
    }
  });

});

