
    document.addEventListener('polymer-ready', function() {
      var ajax = document.querySelector("core-ajax");
      ajax.addEventListener("core-response", 
        function(e) {
          document.querySelector('template').model = {
            response: e.detail.response
          };
        }
      );
    });
  