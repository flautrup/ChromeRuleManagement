//Service to work with rules in QRS
service.factory('qrsRules', function ($resource){
  return $resource(SERVER+'qrs/systemrule/:ruleId?xrfkey='+XRFKEY);
});