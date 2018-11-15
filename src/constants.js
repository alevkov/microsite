const define = (name, value) => {
  Object.defineProperty(exports, name, {
    value:      value,
    enumerable: true
  });
};

define('kEventId', 'KEY_EVENT_ID');