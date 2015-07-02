//Service to manage logal storage of rule packages
service.factory('rulePackage', function (){
  // Add support for reading and storing local storage.
  var rulePackageObj = {
    packageName: "",
    packageDescription: "",
    rulePackageList: []
  };

  return {
    get: function () {
      return rulePackageObj;
    },
    add: function (rule) {
      rulePackageObj.rulePackageList.push(rule);
      return rulePackageObj;
    },
    setName: function (name) {
      rulePackageObj.packageName=name;
      return rulePackageObj;
    },
    setDescription: function (description) {
      rulePackageObj.packageDescription=description;
      return rulePackageObj;
    }
  };

});