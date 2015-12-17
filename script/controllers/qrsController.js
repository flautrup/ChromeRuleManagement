//Controller
service.controller("qrsController", ["$scope", "$http", "qrsRules", "qrsCustProp", "localStorage", "rulePackage", function($scope, $http, qrsRules, qrsCustProp, localStorage, rulePackage) {

  $scope.server = SERVER;
  $scope.logedin = "Logged out";
  $scope.about = "Empty";
  $scope.rulePackageObj = {
    packageName: "",
    packageDescription: "",
    ruleList: []
  };

  //Get the list of rules, parse for custom properties and fetch the custom properies and store with rule
  $scope.list = function() {
    //GET rules
    serverRuleList = qrsRules.query({
      server: "https:"+$scope.server
    }, function() {
      console.log(serverRuleList);
    });

    //Wait for the result
    serverRuleList.$promise.then(function() {

      //Scan for custom properties
      var regexp = /@([\w\d]+)[=!\W]/g;
      var nameRegexp = /[\w\d]+/;

      for (countRules = 0; countRules < serverRuleList.length; countRules++) {
        serverRuleList[countRules].customPropertyList = serverRuleList[countRules].rule.match(regexp);
        serverRuleList[countRules].customPropertyObj = [];
      }

      for (countRules = 0; countRules < serverRuleList.length; countRules++) {
        if (serverRuleList[countRules].customPropertyList !== null) {
          for (countProp = 0; countProp < serverRuleList[countRules].customPropertyList.length; countProp++) {
            var custPropName = nameRegexp.exec(serverRuleList[countRules].customPropertyList[countProp]);
            $scope.storeCustomPropertyInRule(countRules, custPropName[0]);
          }
        }
      }
    });

    //Update list in $scope
    $scope.serverRuleList = serverRuleList;

    //Get packages in local storage
    localStorage.get($scope);

  };

  //Store custom property in rule
  $scope.storeCustomPropertyInRule = function(index, customPropName) {
    var tmpCustObj = qrsCustProp.get({
      server: "https:"+$scope.server,
      custPropName: customPropName
    });
    //Connect custom property definitions to rules that use them
    tmpCustObj.$promise.then(function() {
      serverRuleList[index].customPropertyObj.push(tmpCustObj[0]);
      console.log(tmpCustObj);
    });
  };

  //Change in rule and not added atribute.
  $scope.toogleRule = function(rule) {
    var count = 0;
    while (rule.id != serverRuleList[count].id) {
      count++;
    }
    serverRuleList[count].disabled = !serverRuleList[count].disabled;
  }

  //Add rule to rule package
  $scope.addToRulePackage = function(rule) {
    $scope.rulePackageObj = rulePackage.add(rule);
  };

  //Set rulepackage name
  $scope.setRulePackageName = function(name) {
    return rulePackage.setName(name);
  };

  //Set rulepackage description
  $scope.setRulePackageDescription = function(description) {
    return rulePackage.setDescription(description);
  };

  //Saves rule package using localStorage service
  $scope.saveRulePackage = function() {
    $scope.rulePackageObj = $scope.setRulePackageName($scope.rulePackageObj.packageName);
    $scope.rulePackageObj = $scope.setRulePackageDescription($scope.rulePackageObj.packageDescription);

    //store to local storage and clear.
    console.log($scope.packageList);
    $scope.packageList = localStorage.set($scope.rulePackageObj);
  };

  //Clears current rule package
  $scope.clearRulePackage = function() {
    $scope.rulePackageObj = rulePackage.clear();
  };

  //Load rule package from list of packages in localStorage
  $scope.loadRulePackage = function(findRulePackage) {
    for (count = 0; count < $scope.packageList.length; count++) {
      if ($scope.packageList[count].packageName == findRulePackage.packageName) {
        $scope.rulePackageObj = findRulePackage;
      }
    }
    document.querySelector('core-pages').selected = "1";
    document.querySelector('paper-tabs').selected = "1";
  };

  //Export packageList with all content
  $scope.exportPackageList = function () {
    localStorage.export();
  }

  //Import packageList with and add to current list
  $scope.importPackageList = function () {
    localStorage.import($scope);
    console.log($scope.packageList);
  }

  //Upload rulepackage to server
  //Note:
  //      Read rule with name if exsist dissable and  create new with pkg prefix
  //      If rule contains custom properties add if not already exsists
  $scope.uploadRulePackage = function(rulePackageObj) {
    console.log(rulePackageObj);
    var uniqueListOfCustProp = {};


    for (var rulecount = 0; rulecount < rulePackageObj.ruleList.length; rulecount++) {
      var rule = JSON.parse(JSON.stringify(rulePackageObj.ruleList[rulecount]));

      //Remove added content
      delete rule.customPropertyObj;
      delete rule.customPropertyList;

      //Dissable rule if it exsists
      var exsistingRule = $scope.ruleExsists(rule.name);
      if (exsistingRule != null) {
        var tmpRule = JSON.parse(JSON.stringify(exsistingRule));
        tmpRule.disabled = true;
        delete tmpRule.customPropertyObj;
        delete tmpRule.customPropertyList;
        delete tmpRule.id;
        tmpRule.modifiedDate = new Date().toISOString();
        qrsRules.update({
          server: "https:"+$scope.server,
          ruleId: exsistingRule.id
        }, tmpRule);
      }

      //Remove id to create new
      delete rule.id;
      rule.name = rule.name + "_pkg"

      qrsRules.save({
        server: "https:"+$scope.server
      }, rule);

      //Create a list of unique custom properties in rule package
      for (var custPropCount = 0; custPropCount < rulePackageObj.ruleList[rulecount].customPropertyObj.length; custPropCount++) {
        var customProperty = JSON.parse(JSON.stringify(rulePackageObj.ruleList[rulecount].customPropertyObj[custPropCount]));
        if (!uniqueListOfCustProp.hasOwnProperty(customProperty.name)) {
          uniqueListOfCustProp[customProperty.name] = customProperty;
        }
      }
    }

    //Store unique list of custom properties for the rulepackage
    $scope.createIfCustomPropertyDontExsists(uniqueListOfCustProp);
  };

  //Check if a rule exsists return object if found else null
  $scope.ruleExsists = function(ruleName) {
    for (var count = 0; count < serverRuleList.length; count++) {
      if (serverRuleList[count].name === ruleName) {
        return serverRuleList[count];
      }
    }
    return null;
  };

  //If the custom property do not exsist create it
  $scope.createIfCustomPropertyDontExsists = function(uniqueListOfCustProp) {
    var tmpCustomProperties = qrsCustProp.query({
      server: "https://"+$scope.server
    });
    tmpCustomProperties.$promise.then(function() {
      for (var key in uniqueListOfCustProp) {
        for (var count = 0; count < tmpCustomProperties.length; count++) {
          if (tmpCustomProperties[count].name === key) {
            return;
          }
        }
        delete uniqueListOfCustProp[key].id;
        qrsCustProp.save({
          server: "https:"+$scope.server
        }, uniqueListOfCustProp[key]);
      }
    });
  };

  //Delete rulepackage
  $scope.deleteRulePackage = function(findRuleName) {
    $scope.packageList = localStorage.delete(findRuleName);
  }

  //GEt the details of a rule with id
  $scope.detail = function(id) {
    $scope.ruleDetail = qrsRule.get({
      ruleId: id
    }, function() {
      console.log($scope.ruleDetail);
    });
  };

  //Chang UI if rule is dissabled
  $scope.disableRow = function(rule) {
    if (rule.disabled) {
      return "core-item ruledissabled";
    } else {
      return "core-item";
    }
  }

  //Login to server
  $scope.login = function() {

    $http.get($scope.server + "/hub?xrfkey=" + XRFKEY, {
      withCredentials: true
    });
    $scope.logedin = "Logged in";
    $scope.list();
  };

}]);
