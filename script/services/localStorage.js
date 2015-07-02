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
  };

});