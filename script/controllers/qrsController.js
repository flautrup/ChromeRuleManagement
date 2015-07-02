//Controller
service.controller("qrsController", ["$scope","$http",  "qrsRules", "qrsCustProp", "localStorage", "rulePackage", function($scope, $http, qrsRules, qrsCustProp, localStorage, rulePackage) {

 $scope.server=SERVER;
 $scope.logedin="Logged out";
 $scope.about="Empty";
 $scope.rulePackageObj = {
    packageName: "",
    packageDescription: "",
    rulePackageList: []
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
   regexp=/@([\w\d]+)[=!\W]/g;

   for(count=0; count< serverRuleList.length; count++) {
      count2=0;
      serverRuleList[count].customPropertyList=[];
      var tmpCustomProperty=regexp.exec(serverRuleList[count].rule);
      if (tmpCustomProperty!=null) {
        for(count3=0; count3 < tmpCustomProperty.length; count3++) {
          tmpCustObj=qrsCustProp.get({custPropName: tmpCustomProperty[count3]},function() {
            console.log(tmpCustObj);
          });
          //Connect custom property definitions to rules that use them
          serverRuleList[count].customPropertyList.push(tmpCustObj);
          count2++;
        } 
      } else {
          serverRuleList[count].customPropertyList.push("False");
      }
   }
   });

  //Update list in $scope
   $scope.serverRuleList=serverRuleList;

  //Get packages in local storage
   $scope.rulePackageList=rulePackage.get(function() {
      console.log($scope.rulePackage);
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