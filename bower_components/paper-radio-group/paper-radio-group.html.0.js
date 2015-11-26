
  
    Polymer('paper-radio-group', {
      nextIndex: function(index) {
        var items = this.items;
        var newIndex = index;
        do {
          newIndex = (newIndex + 1) % items.length;
          if (newIndex === index) {
            break;
          }
        } while (items[newIndex].disabled);
        return newIndex;
      },
      previousIndex: function(index) {
        var items = this.items;
        var newIndex = index;
        do {
          newIndex = (newIndex || items.length) - 1;
          if (newIndex === index) {
            break;
          }
        } while (items[newIndex].disabled);
        return newIndex;
      },
      selectNext: function() {
        var node = this.selectIndex(this.nextIndex(this.selectedIndex));
        node.focus();
      },
      selectPrevious: function() {
        var node = this.selectIndex(this.previousIndex(this.selectedIndex));
        node.focus();
      },
      
      /**
       * Specifies the attribute to set on the selected element to indicate
       * its active state.
       *
       * @attribute selectedAttribute
       * @type string
       * @default 'checked'
       */
      selectedAttribute: 'checked',
      
      /**
       * The event that would be fired from the item element to indicate
       * it is being selected.
       *
       * @attribute activateEvent
       * @type string
       * @default 'change'
       */
      activateEvent: 'change'

    });
  
  