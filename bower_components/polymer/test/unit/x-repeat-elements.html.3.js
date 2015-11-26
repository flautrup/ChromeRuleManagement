
  Polymer({
    is: 'x-nested-repeat-configured',
    properties: {
      items: {
        value: window.data
      },
      prop: {
        value: 'outer',
      },
      item: {
        value: function() { return {prop: 'outerItem'}; }
      }
    }
  });
