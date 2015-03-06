//Configuration
var SERVER="https://rd-flp2.qliktech.com/";
var XRFKEY=rand(16);


// Event handling
var tabs = document.querySelector('paper-tabs');
var pages = document.querySelector('core-pages');

tabs.addEventListener('core-select',function(){
  pages.selected = tabs.selected;
});


//Supporting functions
function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}

//Angular code

//Services
var service = angular.module("qrsService", ['ngResource']);

service.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common = { 'x-qlik-xrfkey': XRFKEY };
}]);

//Service to work with rules in QRS
service.factory('qrsRules', function ($resource){
  return $resource(SERVER+'qrs/systemrule/:ruleId?xrfkey='+XRFKEY);
});

//Service to work with custom properties
service.factory('qrsCustProp', function ($resource){
  return $resource(SERVER+"qrs/custompropertydefinition/full?filter=name eq ':custPropName'&xrfkey="+XRFKEY,{},
  { 'get':    {method:'GET', isArray:true},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} });
});

//Service to manage logal storage of rule packages
service.factory('localStorage', function (){
  // Add support for reading and storing local storage.
  var localrulelist = [];

  return {
    get: function () {
      return localrulelist;
    },
    set: function (rule) {
      localrulelist.push(rule);
      return localrulelist;
    }
  }

});

//Service to manage logal storage of rule packages
service.factory('rulePackage', function (){
  // Add support for reading and storing local storage.
  var rulePackageObj = {
    packageName: "",
    packageDescription: "",
    rulePackageList: []
  }

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
  }

});

//Controller
service.controller("qrsController", ["$scope","$http",  "qrsRules", "qrsCustProp", "localStorage", "rulePackage", function($scope, $http, qrsRules, qrsCustProp, localStorage, rulePackage) {

 $scope.server=SERVER;
 $scope.logedin="Logged out";
 $scope.about="Empty";
 $scope.rulePackageObj = {
    packageName: "",
    packageDescription: "",
    rulePackageList: []
  }

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
      while(tmpCustomProperty=regexp.exec(serverRuleList[count].rule)) {
        tmpCustObj=qrsCustProp.get({custPropName: tmpCustomProperty[1]},function() {
          console.log(tmpCustObj);
        });
        //Connect custom property definitions to rules that use them
        serverRuleList[count].customPropertyList.push(tmpCustObj);
        count2++;
      }
      if (count2==0) {
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
}

$scope.setRulePackageDescription = function (description) {
  return rulePackage.setDescription(description);
}

$scope.saveRulePackage = function () {
  $scope.rulePackageObj=$scope.setRulePackageName($scope.rulePackageObj.packageName);
  $scope.rulePackageObj=$scope.setRulePackageDescription($scope.rulePackageObj.packageDescription);

  //store to local storage and clear.
}

 $scope.importToServer=function (rule) {

 };

 $scope.detail=function(id) {
   $scope.ruleDetail=qrsRule.get({ruleId: id}, function() {
      console.log($scope.ruleDetail);
   });

};


$scope.login=function() {

   $http.get($scope.server+"/hub?xrfkey="+XRFKEY, { withCredentials: true });
   $scope.logedin="Logged in"
 }

}]);
