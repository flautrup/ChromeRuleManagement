

suite('2-way binding effects between elements', function() {

  var el;

  setup(function() {
    el = document.createElement('x-compose');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('binding to non-notifying property', function() {
    el.boundvalue = 42;
    assert.equal(el.$.basic1.value, 42, 'binding to child not updated');
    el.$.basic1.value = 43;
    assert.equal(el.boundvalue, 42, 'binding to non-notifying property updated and should not have been');
  });

  test('observer for property bound to non-notifying property', function() {
    el.$.basic1.value = 44;
    assert.equal(el.observerCounts.boundvalueChanged, 0, 'observer for property bound to non-notifying property called and should not have been');
  });

  test('binding to non-notifying computed property', function() {
    el.boundcomputedvalue = 42;
    el.$.basic1.value = 43;
    assert.equal(el.boundcomputedvalue, 42, 'binding to non-notifying computed property updated and should not have been');
  });

  test('observer for property bound to non-notifying computed property', function() {
    el.$.basic1.value = 44;
    assert.equal(el.observerCounts.boundcomputedvalueChanged, 0, 'observer for property bound to non-notifying computed property called and should not have been');
  });

  test('binding to notifying property', function() {
    el.boundnotifyingvalue = 42;
    assert.equal(el.$.basic1.notifyingvalue, 42, 'binding to child not updated');
    assert.equal(el.$.basic1.camelNotifyingValue, 42, 'camel-case binding to child not updated');
    el.$.basic1.notifyingvalue = 43;
    assert.equal(el.boundnotifyingvalue, 43, 'binding to notifying property not updated');
    el.$.basic1.camelNotifyingValue = -43;
    assert.equal(el.boundnotifyingvalue, -43, 'camel-case binding to notifying property not updated');
  });

  test('observer for property bound to notifying property', function() {
    el.$.basic1.notifyingvalue = 45;
    assert.equal(el.observerCounts.boundnotifyingvalueChanged, 1, 'observer for property bound to notifying property not called');
  });

  test('binding to notifying computed property', function() {
    el.$.basic1.notifyingvalue = 43;
    assert.equal(el.boundcomputednotifyingvalue, 45, 'binding to notifying computed property not updated');
  });

  test('observer for property bound to notifying computed property', function() {
    el.$.basic1.notifyingvalue = 45;
    assert.equal(el.observerCounts.boundcomputednotifyingvalueChanged, 1, 'observer for property bound to non-notifying computed property not called');
  });

  test('no change for binding into read-only property', function() {
    el.$.basic1._setReadonlyvalue(45);
    el.$.basic1.clearObserverCounts();
    el.boundreadonlyvalue = 46;
    assert.equal(el.$.basic1.observerCounts.readonlyvalueChanged, 0, 'observer for read-only property should not be called from change to bound value');
    assert.equal(el.$.basic1.readonlyvalue, 45, 'read-only property should not change from change to bound value');
  });

  test('change for binding out of read-only property', function() {
    el.$.basic1._setReadonlyvalue(46);
    assert.equal(el.observerCounts.boundreadonlyvalueChanged, 1, 'observer for property bound to read-only property should be called from change to bound value');
    assert.equal(el.boundreadonlyvalue, 46, 'property bound to read-only property should change from change to bound value');
  });

});

suite('1-way binding effects between elements', function() {

  var el;

  setup(function() {
    el = document.createElement('x-compose');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('one-way binding to non-notifying property', function() {
    el.boundvalue = 42;
    assert.equal(el.$.basic1.value, 42, 'binding to child not updated');
    el.$.basic2.value = 43;
    assert.equal(el.boundvalue, 42, 'binding to non-notifying property updated and should not have been');
  });

  test('observer for property one-way-bound to non-notifying property', function() {
    el.$.basic2.value = 44;
    assert.equal(el.observerCounts.boundvalueChanged, 0, 'observer for property one-way-bound to non-notifying property called and should not have been');
  });

  test('one-way binding to non-notifying computed property', function() {
    el.boundcomputedvalue = 42;
    el.$.basic2.value = 43;
    assert.equal(el.boundcomputedvalue, 42, 'binding to non-notifying computed property updated and should not have been');
  });

  test('observer for property one-way-bound to non-notifying computed property', function() {
    el.$.basic2.value = 44;
    assert.equal(el.observerCounts.boundcomputedvalueChanged, 0, 'observer for property bound to non-notifying computed property called and should not have been');
  });

  test('one-way binding to notifying property', function() {
    el.boundnotifyingvalue = 42;
    assert.equal(el.$.basic2.notifyingvalue, 42, 'binding to child not updated');
    el.$.basic2.notifyingvalue = 43;
    assert.equal(el.boundnotifyingvalue, 42, 'binding to notifying property updated and should not have been');
  });

  test('observer for property one-way-bound to notifying property', function() {
    el.$.basic2.notifyingvalue = 45;
    assert.equal(el.observerCounts.boundnotifyingvalueChanged, 0, 'observer for property bound to notifying property called and should not have been');
  });

  test('one-way binding to notifying computed property', function() {
    el.boundcomputednotifyingvalue = 42;
    el.$.basic2.notifyingvalue = 43;
    assert.equal(el.boundcomputednotifyingvalue, 42, 'binding to notifying computed property updated and should not have been');
  });

  test('observer for property one-way-bound to notifying computed property', function() {
    el.$.basic2.notifyingvalue = 45;
    assert.equal(el.observerCounts.boundcomputednotifyingvalueChanged, 0, 'observer for property bound to non-notifying computed property called and should not have been');
  });

});

suite('reflection to attribute', function() {

  var el;

  setup(function() {
    el = document.createElement('x-reflect');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('reflect object', function() {
    var obj = {foo: 'bar', array: [1, '2', {3:3}]};
    el.reflectedobject = obj;
    assert.equal(el.getAttribute('reflectedobject'), '{"foo":"bar","array":[1,"2",{"3":3}]}');
    // Ensure object wasn't re-deserialized
    assert.equal(el.reflectedobject, obj);
    el.reflectedobject = null;
    assert(!el.hasAttribute('reflectedobject'));
  });

  test('reflect array', function() {
    var arr = [1, '2', {3:3}, {'four': 'four'}];
    el.reflectedarray = arr;
    assert.equal(el.getAttribute('reflectedarray'), '[1,"2",{"3":3},{"four":"four"}]');
    // Ensure array wasn't re-deserialized
    assert.equal(el.reflectedarray, arr);
    el.reflectedarray = null;
    assert(!el.hasAttribute('reflectedarray'));
  });

  test('reflect string', function() {
    var str = '"polymer is grrrrreat, ain\'t it?"';
    el.reflectedstring = str;
    assert.equal(el.getAttribute('reflectedstring'), str);
    assert.equal(el.reflectedstring, str);
    el.reflectedstring = '';
    assert.equal(el.getAttribute('reflectedstring'), '');
    assert.equal(el.reflectedstring, '');
    el.reflectedstring = null;
    assert(!el.hasAttribute('reflectedstring'));
    assert.equal(el.reflectedstring, null);
  });

  test('reflect number', function() {
    el.reflectedNumber = 765;
    assert.equal(el.getAttribute('reflected-number'), '765');
    assert.equal(el.reflectedNumber, 765);
    el.reflectedNumber = 765.4321;
    assert.equal(el.getAttribute('reflected-number'), '765.4321');
    assert.equal(el.reflectedNumber, 765.4321);
    el.reflectedNumber = null;
    assert(!el.hasAttribute('reflected-number'));
    assert.equal(el.reflectedNumber, null);
  });

  test('reflect boolean', function() {
    el.reflectedboolean = true;
    assert(el.hasAttribute('reflectedboolean'));
    assert.equal(el.getAttribute('reflectedboolean'), '');
    assert.equal(el.reflectedboolean, true);
    el.reflectedboolean = false;
    assert(!el.hasAttribute('reflectedboolean'));
    assert.equal(el.reflectedboolean, false);
    el.reflectedboolean = true;
    el.reflectedboolean = null;
    assert(!el.hasAttribute('reflectedboolean'));
    assert.equal(el.reflectedboolean, null);
  });

  test('reflect date', function() {
    var date = new Date('Fri Jan 23 2015 17:40:29 GMT-0800 (PST)');
    el.reflecteddate = date;
    assert(el.hasAttribute('reflecteddate'));
    assert.equal(Date.parse(el.getAttribute('reflecteddate')),
      el.reflecteddate.getTime());
    assert.equal(el.reflecteddate, date);
    el.reflecteddate = null;
    assert(!el.hasAttribute('reflecteddate'));
    assert.equal(el.reflecteddate, null);
  });

  test('reflect wrong type', function() {
    el.reflectedstring = true;
    assert(el.hasAttribute('reflectedstring'));
    assert.equal(el.getAttribute('reflectedstring'), '');
    // Ensure value wasn't re-deserialized
    assert.strictEqual(el.reflectedstring, true);
  });

});

suite('binding to attribute', function() {

  var el;

  setup(function() {
    el = document.createElement('x-basic');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('bind object to attribute', function() {
    el.attrvalue = {foo: 'bar', array: [1, '2', {3:3}]};
    assert.equal(el.$.boundChild.getAttribute('attrvalue'),
      '{"foo":"bar","array":[1,"2",{"3":3}]}');
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

  test('bind array to attribute', function() {
    el.attrvalue = [1, '2', {3:3}, {'four': 'four'}];
    assert.equal(el.$.boundChild.getAttribute('attrvalue'),
      '[1,"2",{"3":3},{"four":"four"}]');
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

  test('bind string to attribute', function() {
    el.attrvalue = '"polymer is grrrrreat, ain\'t it?"';
    assert.equal(el.$.boundChild.getAttribute('attrvalue'),
      '"polymer is grrrrreat, ain\'t it?"');
    el.attrvalue = '';
    assert.equal(el.$.boundChild.getAttribute('attrvalue'), '');
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

  test('bind number to attribute', function() {
    el.attrvalue = 765;
    assert.equal(el.$.boundChild.getAttribute('attrvalue'), '765');
    el.attrvalue = 765.4321;
    assert.equal(el.$.boundChild.getAttribute('attrvalue'), '765.4321');
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

  test('bind boolean to attribute', function() {
    el.attrvalue = true;
    assert(el.$.boundChild.hasAttribute('attrvalue'));
    assert.equal(el.$.boundChild.getAttribute('attrvalue'), '');
    el.attrvalue = false;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
    el.attrvalue = true;
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

  test('bind date to attribute', function() {
    el.attrvalue = new Date('Fri Jan 23 2015 17:40:29 GMT-0800 (PST)');
    assert(el.$.boundChild.hasAttribute('attrvalue'));
    assert.equal(Date.parse(el.$.boundChild.getAttribute('attrvalue')),
      el.attrvalue.getTime());
    el.attrvalue = null;
    assert(!el.$.boundChild.hasAttribute('attrvalue'));
  });

});

suite('avoid non-bubbling event gotchas', function() {

  var el;
  var container;

  setup(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = '<x-notifies3></x-notifies3>';
    if (window.CustomElements) {
      CustomElements.takeRecords();
    }
    el = container.firstChild;
  });

  teardown(function() {
    document.body.removeChild(container);
  });

  test('avoid non-bubbling event gotchas', function() {
    el.$.notifies2.$.notifies1.notifies = 'runtimeValue';
    assert.equal(el.$.notifies2.$.notifies1.notifies, 'runtimeValue');
    assert.equal(el.$.notifies2.shouldChange, 'runtimeValue');
    assert.notEqual(el.shouldNotChange, 'runtimeValue');
  });

  test('avoid non-bubbling event gotchas at ready time', function() {
    assert.equal(el.$.notifies2.$.notifies1.notifies, 'readyValue');
    assert.equal(el.$.notifies2.shouldChange, 'readyValue');
    assert.notEqual(el.shouldNotChange, 'readyValue');
  });

});


