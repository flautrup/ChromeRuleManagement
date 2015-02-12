
    test('race-condition', function(done) {
      var ajax = document.querySelector("core-ajax");
      var xhr = sinon.useFakeXMLHttpRequest();
      var headers = {
        "Content-Type": "text/json"
      };
      var body = function(url) {
        return '{"url": "' + url + '"}';
      };
      var requests = [];
      xhr.onCreate = function (xhr) {
          requests.push(xhr);
      };

      // Make request1, then request2. request2 returns first, followed by request1.
      async.series([
        function(cb) {
          ajax.url="http://example.org/request1"
          cb();
        },
        animationFrameFlush,
        function(cb) {
          ajax.url="http://example.org/request2"
          cb();
        },
        animationFrameFlush,
        function(cb) {
          requests[0].respond(200, headers, body("http://example.org/request2"));
          cb();
        },
        flush,
        function(cb) {
          requests[1].respond(200, headers, body("http://example.org/request1"));
          cb();
        },
        flush,
        function(cb) {
          assert(ajax.response.url.match('request1'),
              "Race condition detected. An earlier request's delayed response " +
              "caused the more recent request's response to be overwritten.");
          done();
          cb();
        }
      ], function(){});
    });
