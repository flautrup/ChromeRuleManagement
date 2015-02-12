
(function() {

  Polymer('list-test', {
    ready: function() {
      window.list = this.$.list;
      this.data = [];
      this.page = 1;
      this.searchText = 'Japan';
      this.apiKey = 'c304f1096a06486d3c1e7ab271bf7f3f';
      this.perPage = 20;
      this.loadMore();
    },
    loadMore: function(e) {
      if (this.page > 0) {
        var ajax = document.createElement('core-ajax');
        ajax.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + 
          this.apiKey + '&safe_search=1&sort=interestingness-desc&text=' + 
          encodeURIComponent(this.searchText) + '&page=' + this.page + "&format=json&per_page=" + this.perPage;
        ajax.addEventListener('core-response', function(e) {
          // setTimeout(function() {
            var data = this.data;
            var resp = JSON.parse(e.detail.response.match('jsonFlickrApi\\((.*)\\)')[1]);
            if (resp.stat == 'ok') {
              resp.photos.photo.forEach(function(o) { data.push(o); });
              this.page = (resp.photos.page != resp.photos.pages) ? resp.photos.page + 1 : 0;
              this.$.threshold.clearLower(!!this.page);
            }
          }.bind(this), 2000);
        // }.bind(this));
        ajax.go();
      }
    }
  });
})();  
