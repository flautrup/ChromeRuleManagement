

suite('single-element binding effects', function() {

  var el;

  setup(function() {
    el = document.createElement('x-basic');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('camel-case binding updates', function() {
    el.value = 41;
    assert.equal(el.$.boundChild.camelCase, 41, 'Value not propagated to camelCase property');
  });

  test('annotation binding updates', function() {
    el.value = 42;
    assert.equal(el.$.boundChild.value, 42, 'Value not propagated to bound child');
  });

  test('negated annotation binding updates', function() {
    el.bool = true;
    assert.equal(el.$.boundChild.negvalue, false, 'Value not negated');
    el.bool = false;
    assert.equal(el.$.boundChild.negvalue, true, 'Value not negated');
  });

  test('observer called', function() {
    assert.equal(el.observerCounts.valueChanged, 1, 'observer not called once for default value at configure');
    el.value = 43;
    assert.equal(el.observerCounts.valueChanged, 2, 'observer not called after property change');
  });

  test('computed value updates', function() {
    el.value = 44;
    assert.equal(el.computedvalue, 45, 'Computed value not correct');
    assert.equal(el.$.boundChild.computedvalue, 45, 'Computed value not propagated to bound child');
  });

  test('computed values to same method updates', function() {
    el.value = 44;
    el.valuetwo = 144;
    assert.equal(el.computedvalue, 45, 'Computed value not correct');
    assert.equal(el.computedvaluetwo, 145, 'Computed value not correct');
    assert.equal(el.$.boundChild.computedvalue, 45, 'Computed value not propagated to bound child');
  });

  test('notification sent', function() {
    var notified = 0;
    el.addEventListener('notifyingvalue-changed', function(e) {
      assert.equal(e.detail.value, 45);
      notified++;
    });
    el.addEventListener('camel-notifying-value-changed', function(e) {
      assert.equal(e.detail.value, 45);
      notified++;
    });
    el.notifyingvalue = 45;
    el.camelNotifyingValue = 45;
    assert.equal(notified, 2, 'Notification events not sent');
  });

  test('computed observer called', function() {
    el.clearObserverCounts();
    el.value = 46;
    assert.equal(el.observerCounts.computedvalueChanged, 1, 'observer not called');
  });

  test('computed notification sent', function() {
    var notified = 0;
    el.addEventListener('computednotifyingvalue-changed', function(e) {
      assert.equal(e.detail.value, 49);
      notified++;
    });
    el.notifyingvalue = 47;
    assert.equal(notified, 1, 'Notification event not sent');
  });

  test('computed property with multiple dependencies', function() {
    var notified = 0;
    el.addEventListener('computed-from-multiple-values-changed', function(e) {
      notified++;
    });
    el.sum1 = 10;
    el.sum2 = 20;
    el.divide = 2;
    assert.equal(el.computedFromMultipleValues, 15, 'Computed value wrong');
    assert.equal(notified, 1, 'Notification event not sent');
    assert.equal(el.observerCounts.computedFromMultipleValuesChanged, 1, 'observer not called');
  });

  test('no read-only observer called with assignment', function() {
    el.readolyvalue = 46;
    assert.equal(el.observerCounts.readonlyvalueChanged, 0, 'observer should not be called for readOnly prop assignment');
  });

  test('read-only observer called with _setReadonlyvalue', function() {
    el._setReadonlyvalue(46);
    assert.equal(el.observerCounts.readonlyvalueChanged, 1, 'observer should be called');
    assert(el.readonlyvalue == 46, 'value should be changed but was not');
  });

  test('no read-only notification sent with assignment', function() {
    var notified = 0;
    el.addEventListener('readonlyvalue-changed', function(e) {
      notified++;
    });
    el.readonlyvalue = 47;
    assert.equal(notified, 0, 'Notification should not be called for readOnly prop assignment');
  });

  test('read-only notification sent with _setReadonlyvalue', function() {
    var notified = 0;
    el.addEventListener('readonlyvalue-changed', function(e) {
      assert.equal(e.detail.value, 47);
      notified++;
    });
    el._setReadonlyvalue(47);
    assert.equal(notified, 1, 'Notification event not sent');
  });

  test('multiple dependency observer called once', function() {
    el.dep1 = true;
    el.dep2 = {};
    el.dep3 = 42;
    assert.equal(el.observerCounts.multipleDepChangeHandler, 1, 'observer not called once');
  });

  test('annotated computed property', function() {
    el.value = 20;
    el.add = 40;
    el.divide = 3;
    assert.equal(el.$.boundChild.computedInline, 20, 'computedInline not correct');
    assert.equal(el.$.boundChild.computedInline2, 20, 'computedInline2 not correct');
  });

  test('annotated computed attribute', function() {
    el.value = 20;
    el.add = 40;
    el.divide = 3;
    assert.equal(el.$.boundChild.getAttribute('computedattribute'), 20, 'computed attribute not correct');
  });

  test('annotated style attribute binding', function() {
    el.boundStyle = 'padding: 37px;';
    assert.equal(getComputedStyle(el.$.boundChild).paddingTop, '37px', 'style attribute binding not correct');
  });

  test('annotated dataset attribute binding', function() {
    el.dataSetId = 'yeah';
    assert.equal(el.$.boundChild.dataset.id, 'yeah', 'dataset.id dataset property not set correctly');
    assert.equal(el.$.boundChild.getAttribute('data-id'), 'yeah', 'data-id attribute not set correctly');
  });

  test('custom notification event to property', function() {
    el.$.boundChild.customEventValue = 42;
    el.fire('custom', null, {node: el.$.boundChild});
    assert.equal(el.customEventValue, 42, 'custom bound property incorrect');
    assert.equal(el.observerCounts.customEventValueChanged, 1, 'custom bound property observer not called');
  });

  test('custom notification event to path', function() {
    el.$.boundChild.customEventObjectValue = 84;
    el.fire('change', null, {node: el.$.boundChild});
    assert.equal(el.customEventObject.value, 84, 'custom bound path incorrect');
    assert.equal(el.observerCounts.customEventObjectValueChanged, 1, 'custom bound path observer not called');
  });

});

