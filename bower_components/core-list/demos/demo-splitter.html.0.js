
(function() {

  Polymer('list-test', {
    page: 'messages',
    ready: function() {
      CoreStyle.g.paperInput.focusedColor = 'white';
      this.messageGroups = [
        {length: 3, data: {label: 'Today'}},
        {length: 15, data: {label: 'Yesterday'}},
        {length: 30, data: {label: 'Last Week'}},
        {length: 150, data: {label: 'Last Month'}},
        {length: 150, data: {label: 'Last Quarter'}},
        {length: 152, data: {label: 'Last Year'}}
      ];

      this.photosData = [];
      this.photosPage = 1;
      this.searchText = 'Japan';
      this.apiKey = 'c304f1096a06486d3c1e7ab271bf7f3f';
      this.perPage = 100;
      this.load(1);
    },
    loadMore: function() {
      this.load();
    },
    load: function(moreCount) {
      if (this.photosPage > 0) {
        var ajax = document.createElement('core-ajax');
        ajax.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + 
          this.apiKey + '&safe_search=1&sort=interestingness-desc&text=' + 
          encodeURIComponent(this.searchText) + '&page=' + this.photosPage + "&format=json&per_page=" + this.perPage;
        ajax.addEventListener('core-response', function(e) {
          var data = this.photosData;
          var resp = JSON.parse(e.detail.response.match('jsonFlickrApi\\((.*)\\)')[1]);
          if (resp.stat == 'ok') {
            resp.photos.photo.forEach(function(o) { data.push(o); });
            this.photosPage = (resp.photos.page != resp.photos.pages) ? resp.photos.page + 1 : 0;
            this.$.threshold.clearLower(!!this.photosPage);
            if (moreCount) {
              this.load(--moreCount);
            }
          }
        }.bind(this));
        ajax.go();
      }
    }
  });
})();  
