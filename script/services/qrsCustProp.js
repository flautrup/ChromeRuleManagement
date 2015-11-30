//Service to work with custom properties
service.factory('qrsCustProp', function($resource) {
  return $resource(SERVER + "qrs/custompropertydefinition/:custPropID?xrfkey=" + XRFKEY, {}, {
    'get': {
      method: 'GET',
      url: SERVER + "qrs/custompropertydefinition/?filter=name eq ':custPropName'&xrfkey=" + XRFKEY,
      isArray: true
    },
    'save': {
      method: 'POST'
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
