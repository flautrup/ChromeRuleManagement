//Service to work with rules in QRS
service.factory('qrsRules', function($resource) {
  return $resource(SERVER + 'qrs/systemrule/:ruleId?xrfkey=' + XRFKEY, {}, {
    'get': {
      method: 'GET'
    },
    'save': {
      method: 'POST'
    },
    'create': {
      method: 'POST'
    },
    'update': {
      method: 'PUT'
    },
    'query': {
      method: 'GET',
      isArray: true
    },
    'remove': {
      method: 'DELETE'
    },
    'delete': {
      method: 'DELETE'
    }
  });
});
