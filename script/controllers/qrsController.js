//Controller
service.controller("qrsController", ["$scope", "$http", "qrsRules", "qrsCustProp", "localStorage", "rulePackage", "$mdToast", function($scope, $http, qrsRules, qrsCustProp, localStorage, rulePackage,$mdToast) {

  SERVER = $scope.server;
  $scope.logedin = "Logged out";
  $scope.about = "Empty";
  $scope.rulePackageObj = {
    packageName: "",
    packageDescription: "",
    ruleList: []
  };

  //Get the list of rules, parse for custom properties and fetch the custom properies and store with rule
  $scope.list = function() {
    // Update SERVER
    SERVER = $scope.server;
    //GET rules
    serverRuleList = qrsRules.query({
      host: "https:" + $scope.server
    }, function() {
      console.log(serverRuleList);
    });

    //Wait for the result
    serverRuleList.$promise.then(function() {

      //Scan for custom properties
      var regexp = /@[\w\d]+[=!)\s]/g;
      var nameRegexp = /[\w\d]+/;

      //Find custom properties in rules
      for (countRules = 0; countRules < serverRuleList.length; countRules++) {
        var tmpCustomPropertyList = serverRuleList[countRules].rule.match(regexp);
        if (tmpCustomPropertyList !== null) {
          serverRuleList[countRules].customPropertyList = [];
          for (countProp = 0; countProp < tmpCustomPropertyList.length; countProp++) {
            serverRuleList[countRules].customPropertyList[countProp] = nameRegexp.exec(tmpCustomPropertyList[countProp])[0];
          }
        }
        serverRuleList[countRules].customPropertyObj = [];
      }

      //Create unique list of custom properties
      for (countRules = 0; countRules < serverRuleList.length; countRules++) {
        if (serverRuleList[countRules].customPropertyList !== null && serverRuleList[countRules].customPropertyList !== undefined) {
          uniqueCustomPropertyList = $scope.getUniqueListOfCustomProperties(serverRuleList[countRules].customPropertyList);
          serverRuleList[countRules].customPropertyList = uniqueCustomPropertyList;
        }
      }

      //Extract the name of the custom properties.
      for (countRules = 0; countRules < serverRuleList.length; countRules++) {
        if (serverRuleList[countRules].customPropertyList !== null && serverRuleList[countRules].customPropertyList !== undefined) {
          for (countProp = 0; countProp < serverRuleList[countRules].customPropertyList.length; countProp++) {
            //var custPropName = nameRegexp.exec(serverRuleList[countRules].customPropertyList[countProp]);
            $scope.storeCustomPropertyInRule(countRules, serverRuleList[countRules].customPropertyList[countProp]);
          }
        }
      }
    });

    //Update list in $scope
    $scope.serverRuleList = serverRuleList;

    //Get packages in local storage
    localStorage.get($scope);

  };

  $scope.getUniqueListOfCustomProperties = function(arr) {
    var n = {},
      r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }

  //Store custom property in rule
  $scope.storeCustomPropertyInRule = function(index, customPropName) {
    var tmpCustObj = qrsCustProp.get({
      host: "https:" + $scope.server,
      custPropName: customPropName
    });
    //Connect custom property definitions to rules that use them
    tmpCustObj.$promise.then(function() {
      //Only store if it do not alrealy exsist
      if (tmpCustObj[0] !== undefined) {
        serverRuleList[index].customPropertyObj.push(tmpCustObj[0]);
        console.log(tmpCustObj);
      }
    });
  };

  //Change in rule and not added atribute.
  $scope.toggleRule = function(rule) {
    var count = 0;
    while (rule.id !== $scope.rulePackageObj.ruleList[count].id) {
      count++;
    }
    $scope.rulePackageObj.ruleList[count].disabled = ! $scope.rulePackageObj.ruleList[count].disabled;
  }

  //Add rule to rule package
  $scope.addToRulePackage = function(rule) {
    $scope.rulePackageObj = rulePackage.add(rule);
    rule.selected=true;
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
    $scope.packageList = localStorage.set($scope.rulePackageObj);
    console.log($scope.packageList);
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
    $scope.selectedIndex = 1;
  };

  //Export packageList with all content
  $scope.exportPackageList = function() {
    localStorage.export();
  }

  //Import packageList with and add to current list
  $scope.importPackageList = function() {
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
      delete rule.selected;

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
          host: "https:" + $scope.server,
          ruleId: exsistingRule.id
        }, tmpRule);
      }

      //Remove id to create new
      delete rule.id;
      rule.name = rule.name + "_pkg"

      qrsRules.save({
        host: "https:" + $scope.server
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
      host: "https:" + $scope.server
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
          host: "https:" + $scope.server
        }, uniqueListOfCustProp[key]);
      }
    });
  };

  //Delete rulepackage
  $scope.deleteRulePackage = function(findRuleName) {
    $scope.packageList = localStorage.delete(findRuleName);
  }

  //Get the details of a rule with id
  $scope.detail = function(id) {
    $scope.ruleDetail = qrsRule.get({
      ruleId: id
    }, function() {
      console.log($scope.ruleDetail);
    });
  };

  //Change UI if rule is dissabled
  $scope.disableRow = function(rule) {
    if (rule.disabled) {
      return "core-item ruledissabled";
    } else {
      return "core-item";
    }
  }

  //Chang UI if rule is selected
$scope.ruleSelected = function(rule) {
  if (rule.selected) {
    return "ruleselected";
  } else {
    return "";
  }
}

//Select all rules for a rule package
$scope.selectAllRules = function() {
  for (var rulecount = 0; rulecount < serverRuleList.length; rulecount++) {
    $scope.addToRulePackage(serverRuleList[rulecount]);
  }
}

  //Login to server
  $scope.login = function() {

    $http.get("https://" + $scope.server + "/hub?xrfkey=" + XRFKEY, {
      withCredentials: true
    }).then(function () {
      $scope.logedin = "Logged in";
      $scope.list();
    }, function () {
      $scope.logedin = "Login failed";
      var url="https://"+$scope.server+"/hub";
      var alert="<md-toast>Please access <a href="+url+" target='_blank'>"+url+"</a> in browser</md-toast>";
      $mdToast.show({template: alert});
      //$mdToast.show($mdToast.simple().textContent(alert));
    });
  };

}]);
