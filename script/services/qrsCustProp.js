//Service to work with custom properties
service.factory('qrsCustProp', function($resource) {
  return $resource(":host/qrs/custompropertydefinition/:custPropID?xrfkey=" + XRFKEY, {}, {
    'get': {
      method: 'GET',
      url: ":host/qrs/custompropertydefinition/full?filter=name eq ':custPropName'&xrfkey=" + XRFKEY,
      isArray: true
    },
    'save': {
      method: 'POST'
    },
    'query': {
      method: 'GET',
      url: ":host/qrs/custompropertydefinition/full?xrfkey=" + XRFKEY,
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
