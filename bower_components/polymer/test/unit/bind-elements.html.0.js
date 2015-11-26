
  Polymer({
    is: 'x-basic',
    properties: {
      value: {
        type: Number,
        observer: 'valueChanged',
        value: 10
      },
      computedvalue: {
        computed: 'computeValue(value)',
        observer: 'computedvalueChanged'
      },
      computedvaluetwo: {
        computed: 'computeValue(valuetwo)',
        observer: 'computedvaluetwoChanged'
      },
      notifyingvalue: {
        type: Number,
        notify: true,
        observer: 'notifyingvalueChanged'
      },
      computednotifyingvalue: {
        type: Number,
        notify: true,
        computed: 'computeNotifyingValue(notifyingvalue)'
      },
      computedFromMultipleValues: {
        type: Number,
        notify: true,
        computed: 'computeFromMultipleValues(sum1, sum2, divide)',
        observer: 'computedFromMultipleValuesChanged'
      },
      camelNotifyingValue: {
        type: Number,
        notify: true
      },
      readonlyvalue: {
        type: Number,
        readOnly: true,
        notify: true,
        observer: 'readonlyvalueChanged'
      },
      add: {
        value: 20
      },
      divide: {
        value: 2
      },
      customEventValue: {
        type: Number,
        observer: 'customEventValueChanged'
      },
      customEventObject: {
        type: Object,
        value: function() { return {}; }
      }
    },
    observers: [
      'multipleDepChangeHandler(dep1 dep2 dep3)',
      'customEventObjectValueChanged(customEventObject.value)'
    ],
    created: function() {
      this.observerCounts = {
        valueChanged: 0,
        computedvalueChanged: 0,
        computedvaluetwoChanged: 0,
        notifyingvalueChanged: 0,
        readonlyvalueChanged: 0,
        computedFromMultipleValuesChanged: 0,
        multipleDepChangeHandler: 0,
        customEventValueChanged: 0,
        customEventObjectValueChanged: 0
      };
    },
    clearObserverCounts: function() {
      for (var i in this.observerCounts) {
        this.observerCounts[i] = 0;
      }
    },
    valueChanged: function(val, old) {
      this.observerCounts.valueChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.value, 'observer value argument wrong');
      assert.equal(old, this._value, 'observer old argument wrong');
      this._value = val;
    },
    computeValue: function(val) {
      return val + 1;
    },
    computedvalueChanged: function(val, old) {
      this.observerCounts.computedvalueChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.computedvalue, 'observer value argument wrong');
      assert.equal(old, this._computedvalue, 'observer old argument wrong');
      this._computedvalue = val;
    },
    computedvaluetwoChanged: function(val, old) {
      this.observerCounts.computedvaluetwoChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.computedvaluetwo, 'observer value argument wrong');
      assert.equal(old, this._computedvaluetwo, 'observer old argument wrong');
      this._computedvaluetwo = val;
    },
    notifyingvalueChanged: function(val, old) {
      this.observerCounts.notifyingvalueChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.notifyingvalue, 'observer value argument wrong');
      assert.equal(old, this._notifyingvalue, 'observer old argument wrong');
      this._notifyingvalue = val;
    },
    readonlyvalueChanged: function(val, old) {
      this.observerCounts.readonlyvalueChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.readonlyvalue, 'observer value argument wrong');
      assert.equal(old, this._readonlyvalue, 'observer old argument wrong');
      this._readonlyvalue = val;
    },
    computeNotifyingValue: function(val) {
      return val + 2;
    },
    computeFromMultipleValues: function(sum1, sum2, divide) {
      assert.equal(arguments.length, 3, 'observer argument length wrong');
      assert.equal(sum1, this.sum1, 'observer value argument wrong');
      assert.equal(sum2, this.sum2, 'observer value argument wrong');
      assert.equal(divide, this.divide, 'observer value argument wrong');
      return (sum1 + sum2) / divide;
    },
    computedFromMultipleValuesChanged: function(val, old) {
      this.observerCounts.computedFromMultipleValuesChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.computedFromMultipleValues, 'observer value argument wrong');
      assert.equal(old, this._computedFromMultipleValues, 'observer old argument wrong');
      this._computedFromMultipleValues = val;
    },
    multipleDepChangeHandler: function(dep1, dep2, dep3) {
      this.observerCounts.multipleDepChangeHandler++;
      assert.equal(arguments.length, 3, 'observer argument length wrong');
      assert.equal(dep1, this.dep1, 'dependency 1 argument wrong');
      assert.equal(dep2, this.dep2, 'dependency 2 argument wrong');
      assert.equal(dep3, this.dep3, 'dependency 3 argument wrong');
    },
    computeInline: function(value, add, divide) {
      assert.equal(arguments.length, 3, 'observer argument length wrong');
      assert.equal(value, this.value, 'dependency 1 argument wrong');
      assert.equal(add, this.add, 'dependency 2 argument wrong');
      assert.equal(divide, this.divide, 'dependency 3 argument wrong');
      return (value + add) / divide;
    },
    customEventValueChanged: function(val, old) {
      this.observerCounts.customEventValueChanged++;
      assert.equal(arguments.length, 2, 'observer argument length wrong');
      assert.equal(val, this.customEventValue, 'observer value argument wrong');
      assert.equal(old, this._customEventValue, 'observer old argument wrong');
      this._customEventValue = val;
    },
    customEventObjectValueChanged: function(val) {
      this.observerCounts.customEventObjectValueChanged++;
      assert.equal(arguments.length, 1, 'observer argument length wrong');
      assert.equal(val, this.customEventObject.value, 'observer value argument wrong');
      // note, no `old` argument for path observers
    }
  });
