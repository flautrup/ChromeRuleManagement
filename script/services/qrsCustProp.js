//Service to work with custom properties
service.factory('qrsCustProp', function ($resource){
  return $resource(SERVER+"qrs/custompropertydefinition/full?filter=name eq ':custPropName'&xrfkey="+XRFKEY,{},
  { 'get':    {method:'GET', isArray:true},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} });
});