

  addEventListener('template-bound', function(e) {

    var scope = e.target;
    var n;
    scope.data = [];
    for (n=0; n<20; n++) {
      scope.data.push(n);
    }
    scope.loadMore = function() {
      setTimeout(function() {
        for (var i=n; i<n+10; i++) {
          scope.data.push(i);
        }
        n = i;
        scope.$.threshold.clearLower();
      }, 1000);
    };
  });

