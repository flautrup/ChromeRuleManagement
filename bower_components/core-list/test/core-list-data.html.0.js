
  test('core-list-data', function(done) {
    // Initial setup
    var list = document.querySelector('core-list');
    var height = 80;
    var physicalCount = Math.ceil(list.offsetHeight  / height);
    var index = 0;
    // Helper to create random items
    var generateItem = function() {
      return {
        id: Math.floor(Math.random()*10000),
        checked: !!Math.floor(Math.random()*2),
        value: Math.floor(Math.random()*10000),
        type: Math.floor(Math.random()*3)
      };
    };
    // Helper to populate the list
    var populateList = function(next) {
      var more = physicalCount * 20;
      list.data = [];
      while (more--) {
        list.data.push(generateItem());
      }
      waitFor(function() {
        chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
          'children.length should be > ' + physicalCount + ' (1 template + max number of elements) after populating list');
        for (i=1; i<list.children.length - 1; i++) {
          chai.assert(list.children[i].getAttribute('hidden') === null,
            'all items should be visible after populating list; item ' + i + ' was hidden');
        }
      }, next);
    };
    async.series([
      // Set data to null
      function(next) {
        populateList(function() {
          list.children[1].listHasNotReRendered = true;
          list.data  = null;
          waitFor(function() {
            chai.assert(list.children[1].listHasNotReRendered,
              'list should not re-render when setting list.data to null');
            chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
              'children.length should be > ' + physicalCount + ' (1 template + max number of elements');
            for (i=1; i<list.children.length - 1; i++) {
              chai.assert(list.children[i].getAttribute('hidden') !== null,
                'all items should be hidden after setting list.data to null; item ' + i + ' was not hidden');
            }
          }, next);
        });
      },
      // Splice all items from data
      function(next) {
        populateList(function() {
          list.data.splice(0, list.data.length);
          waitFor(function() {
            chai.assert(list.children[1].listHasNotReRendered,
              'list should not re-render when splicing all items from list.data');
            chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
              'children.length should be > ' + physicalCount + ' (1 template + max number of elements');
            for (i=1; i<list.children.length - 1; i++) {
              chai.assert(list.children[i].getAttribute('hidden') !== null,
                'all items should be hidden; item after splicing all items from list.data' + i + ' was not hidden');
            }
          }, next);
        });
      },
      // Set data to empty array
      function(next) {
        populateList(function() {
          list.data = [];
          waitFor(function() {
            chai.assert(list.children[1].listHasNotReRendered,
              'list should not re-render when initializing list.data to []');
            chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
              'children.length should be > ' + physicalCount + ' (1 template + max number of elements');
            for (i=1; i<list.children.length - 1; i++) {
              chai.assert(list.children[i].getAttribute('hidden') !== null,
                'all items should be hidden; item after initializing list.data to []' + i + ' was not hidden');
            }
          }, next);
        });
      },
      // Push one item
      function(next) {
        list.data.push(generateItem());
        waitFor(function() {
          chai.assert(list.children[1].listHasNotReRendered,
            'list should not re-render when adding items to list');
          chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
            'children.length should be > ' + physicalCount + ' (1 template + max number of elements');
          chai.assert(list.children[1].querySelector('#index').textContent == '0',
            'first item index content should be ' + index + ' after adding item to list');
          chai.assert(list.children[1].querySelector('#id').textContent == list.data[0].id,
            'first item id content should be ' + list.data[0].id + ' after adding item to list');
          for (var i=1; i<list.children.length - 1; i++) {
            if (i < 2) {
              chai.assert(list.children[i].getAttribute('hidden') === null,
                'first 1 item should not be hidden after adding an item');
            } else {
              chai.assert(list.children[i].getAttribute('hidden') !== null,
                'remaining items should be hidden after adding an item');
            }
          }
        }, next);
      },
      // Push another item
      function(next) {
        list.data.push(generateItem());
        waitFor(function() {
          chai.assert(list.children[1].listHasNotReRendered,
            'list should not re-render when adding items to list');
          chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
            'children.length should be ' + physicalCount + ' (1 template + max number of elements');
          chai.assert(list.children[1].querySelector('#index').textContent == '0',
            'first item index content should be 0 after adding item to list');
          chai.assert(list.children[1].querySelector('#id').textContent == list.data[0].id,
            'first item id content should be ' + list.data[0].id + ' after adding item to list');
          chai.assert(list.children[2].querySelector('#index').textContent == '1',
            'second item index content should be 1 after adding item to list');
          chai.assert(list.children[2].querySelector('#id').textContent == list.data[1].id,
            'second item id content should be ' + list.data[1].id + ' after adding item to list');
          for (var i=1; i<list.children.length - 1; i++) {
            if (i < 3) {
              chai.assert(list.children[i].getAttribute('hidden') === null,
                'first 1 item should not be hidden after adding an item');
            } else {
              chai.assert(list.children[i].getAttribute('hidden') !== null,
                'remaining items should be hidden after adding an item');
            }
          }
        }, next);
      }
    ], done);
  });

