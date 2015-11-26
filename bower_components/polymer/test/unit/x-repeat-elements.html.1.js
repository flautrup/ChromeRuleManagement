
  Polymer({
    is: 'x-foo',
    properties: {
      prop: {
        notify: true
      },
      itemProp: {
        notify: true
      },
      parentProp: {
        notify: true,
      },
      parentItemProp: {
        notify: true
      },
      parentParentProp: {
        notify: true,
      },
      parentParentItemProp: {
        notify: true
      },
      parentParentParentProp: {
        notify: true,
      },
      parentParentParentItemProp: {
        notify: true
      }
    }
  });
  Polymer({
    is: 'x-bar',
    properties: {
      prop: {
        notify: true
      },
      itemProp: {
        notify: true
      },
      parentProp: {
        notify: true,
      },
      parentItemProp: {
        notify: true
      },
      parentParentProp: {
        notify: true,
      },
      parentParentItemProp: {
        notify: true
      },
      parentParentParentProp: {
        notify: true,
      },
      parentParentParentItemProp: {
        notify: true
      }
    }
  });
