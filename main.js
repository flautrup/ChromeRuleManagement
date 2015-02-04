var server="https://rd-flp2.qliktech.com/";

var service = angular.module("qrsService", ['ngResource']);

service.factory('QRS', function ($resource){
  return $resource(server+'qrs/about');
});

/*service.factory("QRS", function () {
  var QRS = function() {
    this.get = function() {
      return ("FactoryResults");
    };
  };
});*/

 service.controller("qrsController", ["$scope","QRS", function($scope, QRS) {
 var about=QRS.get(function() {
   console.log(about);
 });

 var login=function() {
   $http.get("https://rd-flp2.qliktech.com:4244/windows_authentication/", { withCredentials: true });
 }

 $scope.about=about;
}]);
