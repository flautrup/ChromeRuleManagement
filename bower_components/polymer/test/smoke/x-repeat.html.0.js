
  HTMLImports.whenReady(function() {

    Polymer ({
      is: 'x-labeled-input',
      properties: {
        value: {
          notify: true
        },
        label: String,
        disabled: Boolean
      }
    });

    Polymer ({
      is: 'x-test',
      properties: {
        items: {
          value: function() {
            return [
              {name: 'item 1', items: [
                {name: 'item 1-1', items: [
                  {name: 'item 1-1-1'},
                  {name: 'item 1-1-2'},
                  {name: 'item 1-1-3'}
                ]},
                {name: 'item 1-2', items: [
                  {name: 'item 1-2-1'},
                  {name: 'item 1-2-2'},
                  {name: 'item 1-2-3'}
                ]},
                {name: 'item 1-3', items: [
                  {name: 'item 1-3-1'},
                  {name: 'item 1-3-2'},
                  {name: 'item 1-3-3'}
                ]}
              ]},
              {name: 'item 2', items: [
                {name: 'item 2-1', items: [
                  {name: 'item 2-1-1'},
                  {name: 'item 2-1-2'},
                  {name: 'item 2-1-3'}
                ]},
                {name: 'item 2-2', items: [
                  {name: 'item 2-2-1'},
                  {name: 'item 2-2-2'},
                  {name: 'item 2-2-3'}
                ]},
                {name: 'item 2-3', items: [
                  {name: 'item 2-3-1'},
                  {name: 'item 2-3-2'},
                  {name: 'item 2-3-3'}
                ]}
              ]},
              {name: 'item 3', items: [
                {name: 'item 3-1', items: [
                  {name: 'item 3-1-1'},
                  {name: 'item 3-1-2'},
                  {name: 'item 3-1-3'}
                ]},
                {name: 'item 3-2', items: [
                  {name: 'item 3-2-1'},
                  {name: 'item 3-2-2'},
                  {name: 'item 3-2-3'}
                ]},
                {name: 'item 3-3', items: [
                  {name: 'item 3-3-1'},
                  {name: 'item 3-3-2'},
                  {name: 'item 3-3-3'}
                ]},
              ]}
            ];
          }
        },
        outerA: {
          value: 'outerA'
        },
        outerB: {
          value: 'outerB'
        },
        outerC: {
          value: 'outerC'
        },
        outerObjA: {
          value: function() { return { value: 'outerObjA.value' }; }
        },
        outerObjB: {
          value: function() { return { value: 'outerObjB.value' }; }
        },
        outerObjC: {
          value: function() { return { value: 'outerObjC.value' }; }
        }
      },
      handleClickA: function() {
        this.outerA = this.outerA + 'A';
      },
      handleClickB: function() {
        this.outerB = this.outerB + 'B';
      },
      handleClickC: function() {
        this.outerC = this.outerC + 'C';
      },
      computeInner: function(a, b) {
        return a + '-' + b;
      }
    });

  });
