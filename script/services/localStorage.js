//Service to manage logal storage of rule packages
service.factory('localStorage', function (){
  // Add support for reading and storing local storage.
  var localpackagelist = [];

  return {
    get: function () {
      chrome.storage.local.get({'localpackagelist': []}, function (result){
        localpackagelist=result.localpackagelist;
        return localpackagelist;
      });
    },
    set: function (rulePackage) {
      localpackagelist.push(rulePackage);
      chrome.storage.local.set({'localpackagelist': localpackagelist});
      return localpackagelist;
    },
    delete: function (rulePackage) {
      var index=0;
      while(localpackagelist[index].packageName!=rulePackage.packageName) {
        index++;
      }
      localpackagelist.splice(index,1);
      chrome.storage.local.set({'localpackagelist': localpackagelist});
      return localpackagelist;
    }
  };

});
