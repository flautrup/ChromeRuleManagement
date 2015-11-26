
  Polymer({
    is: 'x-compose',
    observers: [
      'boundvalueChanged(boundvalue)',
      'boundnotifyingvalueChanged(boundnotifyingvalue)',
      'boundcomputedvalueChanged(boundcomputedvalue)',
      'boundcomputednotifyingvalueChanged(boundcomputednotifyingvalue)',
      'boundreadonlyvalueChanged(boundreadonlyvalue)'
    ],
    created: function() {
      this.observerCounts = {
        boundvalueChanged: 0,
        boundnotifyingvalueChanged: 0,
        boundcomputedvalueChanged: 0,
        boundcomputednotifyingvalueChanged: 0,
        boundreadonlyvalueChanged: 0
      };
    },
    clearObserverCounts: function() {
      for (var i in this.observerCounts) {
        this.observerCounts[i] = 0;
      }
    },
    boundvalueChanged: function() {
      this.observerCounts.boundvalueChanged++;
    },
    boundnotifyingvalueChanged: function() {
      this.observerCounts.boundnotifyingvalueChanged++;
    },
    boundcomputedvalueChanged: function() {
      this.observerCounts.boundcomputedvalueChanged++;
    },
    boundcomputednotifyingvalueChanged: function() {
      this.observerCounts.boundcomputednotifyingvalueChanged++;
    },
    boundreadonlyvalueChanged: function() {
      this.observerCounts.boundreadonlyvalueChanged++;
    }
  });
