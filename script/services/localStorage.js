//Service to manage logal storage of rule packages
service.factory('localStorage', function() {
  // Add support for reading and storing local storage.
  var localpackagelist = [];

  return {
    get: function($scope) {
      chrome.storage.local.get({
        'localpackagelist': []
      }, function(result) {
        $scope.packageList = result.localpackagelist;
        localpackagelist = result.localpackagelist;
      });
    },
    set: function(rulePackage) {
      //check if already exsists
      var count = 0;
      var duplicate = false;

      while (!duplicate && count < localpackagelist.length) {
        if (localpackagelist[count].packageName === rulePackage.packageName) {
          duplicate = true;
        } else {
          count++;
        }
      }

      if (count == localpackagelist.length) {
        localpackagelist.push(rulePackage);
        chrome.storage.local.set({
          'localpackagelist': localpackagelist
        });
        return localpackagelist;
      } else {
        return localpackagelist;
      }
    },
    delete: function(rulePackage) {
      var index = 0;
      while (localpackagelist[index].packageName != rulePackage.packageName) {
        index++;
      }
      localpackagelist.splice(index, 1);
      chrome.storage.local.set({
        'localpackagelist': localpackagelist
      });
      return localpackagelist;
    },
    export: function() {
      chrome.storage.local.get({
        'localpackagelist': []
      }, function(list) {
        // Convert object to a string.
        var result = angular.toJson(list);

        chrome.fileSystem.chooseEntry({
          type: 'saveFile',
          suggestedName: 'rules.json'
        }, function(writableFileEntry) {

          function errorHandler() {
            console.log('error');
          };

          writableFileEntry.createWriter(function(writer) {
            writer.onerror = errorHandler;
            writer.onwriteend = function(e) {
              console.log('write complete');
            };
            writer.write(new Blob([result], {
              type: "application/json"
            }));
          }, errorHandler);
        });
        // Use Filesystem API to store
      });
    },
    import: function($scope) {
      chrome.fileSystem.chooseEntry({
        type: 'openFile'
      }, function(readOnlyEntry) {

        function errorHandler() {
          console.log('error');
        };

        readOnlyEntry.file(function(file) {
          var reader = new FileReader();

          reader.onerror = errorHandler;
          reader.onloadend = function(e) {
            loadedpackagelist = JSON.parse(e.target.result);
            //console.log(loadedpackagelist);
            for (var count = 0; count < loadedpackagelist.localpackagelist.length; count++) {
              localpackagelist.push(loadedpackagelist.localpackagelist[count]);
            }
            chrome.storage.local.set({
              'localpackagelist': localpackagelist
            }, function() {
              $scope.packageList = localpackagelist;
              $scope.$apply();
            });
          };

          reader.readAsText(file);
        });
      });
      //load list, merge lists and store.
    }
  };

});
