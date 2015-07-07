//Service to manage logal storage of rule packages
service.factory('localStorage', function (){
  // Add support for reading and storing local storage.
  var localpackagelist = [];

  return {
    get: function () {
      return localpackagelist;
    },
    set: function (rulePackage) {
      localpackagelist.push(rulePackage);
      return localpackagelist;
    }
  };

});