//Controller
service.controller("qrsController", ["$scope","$http",  "qrsRules", "qrsCustProp", "localStorage", "rulePackage", function($scope, $http, qrsRules, qrsCustProp, localStorage, rulePackage) {

 $scope.server=SERVER;
 $scope.logedin="Logged out";
 $scope.about="Empty";
 $scope.rulePackageObj = {
    packageName: "",
    packageDescription: "",
    ruleList: []
  };

//Get the list of rules, parse for custom properties and fetch the custom properies
 $scope.list=function() {
   //GET rules
   serverRuleList=qrsRules.query(function() {
      console.log(serverRuleList);
   });

    //Wait for the result
    serverRuleList.$promise.then(function() {

    //Scan for custom properties
    var regexp=/@([\w\d]+)[=!\W]/g;
    var nameRegexp=/[\w\d]+/;

    for(countRules=0; countRules< serverRuleList.length; countRules++) {
        serverRuleList[countRules].customPropertyList=serverRuleList[countRules].rule.match(regexp);
        serverRuleList[countRules].customPropertyObj=[];
    }

    for(countRules=0; countRules< serverRuleList.length; countRules++) {
      if (serverRuleList[countRules].customPropertyList!==null) {
        for(countProp=0; countProp < serverRuleList[countRules].customPropertyList.length; countProp++) {
          var custPropName=nameRegexp.exec(serverRuleList[countRules].customPropertyList[countProp]);
          $scope.storeCustomPropertyInRule(countRules,custPropName[0]);
        }
      }
    }
   });

  //Update list in $scope
   $scope.serverRuleList=serverRuleList;

  //Get packages in local storage
   $scope.packageList=localStorage.get(function() {
      console.log($scope.rulePackage);
   });

};

$scope.storeCustomPropertyInRule=function(index,customPropName) {
   var tmpCustObj=qrsCustProp.get({custPropName: customPropName});
   //Connect custom property definitions to rules that use them
   tmpCustObj.$promise.then (function () {
      serverRuleList[index].customPropertyObj.push(tmpCustObj);
          console.log(tmpCustObj);
    });
};

$scope.addToRulePackage=function (rule) {
   $scope.rulePackageObj=rulePackage.add(rule);
};

$scope.setRulePackageName = function (name) {
  return rulePackage.setName(name);
};

$scope.setRulePackageDescription = function (description) {
  return rulePackage.setDescription(description);
};

$scope.saveRulePackage = function () {
  $scope.rulePackageObj=$scope.setRulePackageName($scope.rulePackageObj.packageName);
  $scope.rulePackageObj=$scope.setRulePackageDescription($scope.rulePackageObj.packageDescription);

  //store to local storage and clear.
  $scope.packageList=localStorage.set($scope.rulePackageObj);
};

$scope.clearRulePackage = function () {
  $scope.rulePackageObj = rulePackage.clear();
};

$scope.loadRulePackage = function () {
};

$scope.uploadRulePackage = function () {
};


$scope.importToServer=function (rule) {

};

$scope.detail=function(id) {
   $scope.ruleDetail=qrsRule.get({ruleId: id}, function() {
      console.log($scope.ruleDetail);
   });

};


$scope.login=function() {

   $http.get($scope.server+"/hub?xrfkey="+XRFKEY, { withCredentials: true });
   $scope.logedin="Logged in";
   $scope.list();
 };

}]);
