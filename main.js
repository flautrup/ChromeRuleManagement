//Configuration
var server="https://rd-flp2.qliktech.com/";
var xrfkey=rand(16);


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

var service = angular.module("qrsService", ['ngResource']);

service.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common = { 'x-qlik-xrfkey': xrfkey };
}]);

service.factory('QRSRules', function ($resource){
  return $resource(server+'qrs/systemrule/:ruleId?xrfkey='+xrfkey);
});

service.factory('QRSCustProp', function ($resource){
  return $resource(server+"qrs/custompropertydefinition/full?filter=name eq ':custpropName'&xrfkey="+xrfkey,{},
  { 'get':    {method:'GET', isArray:true},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} });
});


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

service.controller("qrsController", ["$scope","$http",  "QRSRules", "QRSCustProp", "localStorage", function($scope, $http, QRSRules, QRSCustProp, localStorage) {

 $scope.server=server;
 $scope.logedin="Logged out";
 $scope.about="Empty";

 $scope.list=function() {
   //GET rules
   serverrulelist=QRSRules.query(function() {
      console.log(serverrulelist);
   });

  //Wait for the result
   serverrulelist.$promise.then(function() {

  //Scan for custom properties
   regexp=/@([\w\d]+)[=!\W]/g;

   for(count=0; count< serverrulelist.length; count++) {
      count2=0;
      serverrulelist[count].custompropertylist=[];
      while(tmpcustomproperty=regexp.exec(serverrulelist[count].rule)) {
        tmpcustobj=QRSCustProp.get({custpropName: tmpcustomproperty[1]},function() {
          console.log(tmpcustobj);
        });
        serverrulelist[count].custompropertylist.push(tmpcustobj);
        count2++;
      }
      if (count2==0) {
        serverrulelist[count].custompropertylist.push("False");
      }
   }
   });

  //Update list in $scope
   $scope.serverrulelist=serverrulelist;

  //Get packages in local storage
   $scope.rulepackage=localStorage.get(function() {
      console.log($scope.rulepackage);
   });

 };

 $scope.store=function (rule) {
   $scope.rulepackage=localStorage.set(rule);
 };

 $scope.importToServer=function (rule) {

 };

 $scope.detail=function(id) {
   $scope.ruledetail=QRS.get({ruleId: id}, function() {
      console.log($scope.ruledetail);
   });

};


$scope.login=function() {

   $http.get($scope.server+"?xrfkey="+xrfkey, { withCredentials: true });
   $scope.logedin="Logged in"
 }

}]);
