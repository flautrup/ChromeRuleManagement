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

service.factory('QRS', function ($resource){
  return $resource(server+'qrs/systemrule/:ruleId?xrfkey='+xrfkey);
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

service.controller("qrsController", ["$scope","$http",  "QRS", "localStorage", function($scope, $http, QRS, localStorage) {

 $scope.server=server;
 $scope.logedin="Logged out";
 $scope.about="Empty";

 $scope.list=function() {
   serverrulelist=QRS.query(function() {
      console.log(serverrulelist);
   });

   serverrulelist.$promise.then(function() {

   regexp=/@([\w\d]+)[=!\W]/g;

   for(count=0; count< serverrulelist.length; count++) {
      tmpcustomproperty=regexp.exec(serverrulelist[count]);
      if( tmpcustomproperty!=null ) {
        serverrulelist[count].customproperty=tmpcustomproperty;
      }  else {
        serverrulelist[count].customproperty=false;
      }
    }

   });

   $scope.serverrulelist=serverrulelist;

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
