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

 service.controller("qrsController", ["$scope","$http", "QRS", function($scope, $http, QRS) {

 $scope.about="Empty";

 $scope.refresh=function() {
   /*var about=QRS.get(function() {
      console.log(about);
    });*/

  $scope.about="Updated";
 };


$scope.login=function() {
   $http.get("https://rd-flp2.qliktech.com/qrs/about", { withCredentials: true });
 }


}]);
