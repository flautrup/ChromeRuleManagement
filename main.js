var server="https://rd-flp2.qliktech.com/";
var xrfkey=rand(16);

var service = angular.module("qrsService", ['ngResource']);

function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}

service.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common = { 'x-qlik-xrfkey': xrfkey };
}]);

service.factory('QRS', function ($resource){
  return $resource(server+'qrs/systemrule/:ruleId?xrfkey='+xrfkey);
});


service.controller("qrsController", ["$scope","$http",  "QRS", function($scope, $http, QRS) {

 $scope.logedin="Logged out";
 $scope.about="Empty";

 $scope.list=function() {
   $scope.rulelist=QRS.query(function() {
      console.log($scope.rulelist);
   });

 };

 $scope.detail=function(id) {
   $scope.ruledetail=QRS.get({ruleId: id}, function() {
      console.log($scope.ruledetail);
   });

 };


$scope.login=function() {

   $http.get("https://rd-flp2.qliktech.com/qrs/about?xrfkey="+xrfkey, { withCredentials: true });
   $scope.logedin="Logged in"
 }

}]);
