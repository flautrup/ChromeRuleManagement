

  function testValueAndChangeHandler(e, value) {
    assert.equal(e.content, value, 'Property does not equal configured value');
    assert.equal(e.changeHandlerCount, 1, 'property `change` Change handler not run when default value set');
    assert.equal(e.objectChangeHandlerCount, 1, 'property `object` Change handler not run when default value set');
  }

  function testConfigure(e, value, objectValue) {
    testValueAndChangeHandler(e, value);
    assert.equal(e.object.foo, objectValue);
    assert.equal(e.$.content.textContent, value, 'Bound value not propagated to dom');
  }

  function testConfigureHost(e, value) {
    testValueAndChangeHandler(e, value);
    e = e.$.child;
    testValueAndChangeHandler(e, value);
    e = e.$.gchild;
    testValueAndChangeHandler(e, value);
    assert.equal(e.$.content.textContent, value, 'Bound value not propagated to dom');
  }

  suite('configure', function() {

    test('value set in properties initializes correctly', function() {
      var e = document.querySelector('x-configure-value');
      testConfigure(e, 'default', 'obj-default');      
    });

    test('attribute overrides value set in properties', function() {
      var e = document.querySelector('x-configure-value[content]');
      testConfigure(e, 'attr', 'obj-attr');
    });

    test('configured values initialize and propagates', function() {
      var e = document.querySelector('x-configure-host');
      testConfigureHost(e, 'host');
    });

    test('attribute overrides configured values and propagates', function() {
      var e = document.querySelector('x-configure-host[content]');
      testConfigureHost(e, 'attr');
    });

    test('property changed in change handler of another not stomped by default', function() {
      var e = document.querySelector('x-configure-value');
      assert.equal(e.stomp, 10);
    });

    test('read-only property initialized to default value', function() {
      var e = document.querySelector('x-configure-value');
      assert.equal(e.readOnly, 'default');
    });

  });

