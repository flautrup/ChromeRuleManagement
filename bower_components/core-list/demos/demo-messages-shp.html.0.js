
(function() {

  Polymer('list-test', {
    ready: function() {
      CoreStyle.g.paperInput.focusedColor = 'white';
      window.list = this.$.list;
      this.groups = [
        {length: 3, data: {label: 'Today'}},
        {length: 15, data: {label: 'Yesterday'}},
        {length: 30, data: {label: 'Last Week'}},
        {length: 150, data: {label: 'Last Month'}},
        {length: 150, data: {label: 'Last Quarter'}},
        {length: 152, data: {label: 'Last Year'}}
      ];
      this.filteredGroups = this.groups;
    },
    dataChanged: function() {
      this.filteredData = this.data;
    },
    jumpToGroup: function(e) {
      var idx = e.detail.item.templateInstance.model.index;
      this.$.list.scrollToGroup(idx);
    },
    toggleSearch: function(e) {
      this.$.searchOverlay.toggle();
    },
    searchOpened: function() {
      this.$.searchInput.focus();
    },
    updateFilter: function(e) {
      if (this.filterThrottle) {
        clearTimeout(this.filterThrottle);
      }
      this.filterThrottle = setTimeout(function() {
        var value = this.$.searchInput.inputValue;
        this.filteredGroups = value ? null : this.groups;
        this.filteredData = this.data.filter(function(o) {
          return new RegExp(value, 'i').test(o.name);
        }.bind(this));
      }.bind(this), 500);
    }
  });
})();  
