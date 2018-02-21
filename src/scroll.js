const defaultOptions = {
  scrollRate : 100,
  updateRate: 100,
  fromBeginning: true,
  initScrollCallback : () => { },
  duringScrollCallback : () => { },
  endScrollCallback : () => { },
};

const asyncRequestAnimationFrame = (callback) => new Promise(
  (resolve) => requestAnimationFrame( () => {
    callback();
    resolve();
  })
);

const scroll = (DOMElement, userOptions = {}) => {

  // Default variables...

  const scrollRate = userOptions.scrollRate || defaultOptions.scrollRate;
  const updateRate = userOptions.updateRate || defaultOptions.updateRate;
  let initScrollInterval = 0;
  let checkScrollInterval = 0;

  if (userOptions.fromBeginning != null) {
    userOptions.fromBeginning && DOMElement.scrollTop = 0;
  } else {
    defaultOptions.fromBeginning && DOMElement.scrollTop = 0;
  }

  /**
   * Scrolls the given DOM element by the given scroll rate (in pixels).
   */
  const scrollNode = (DOMElement, scrollRate) => asyncRequestAnimationFrame(
    () => DOMElement.scrollTop += scrollRate
  ).then(() => {
    userOptions.duringScrollCallback && userOptions.duringScrollCallback();

    const completed = DOMElement.scrollHeight - DOMElement.scrollTop === DOMElement.clientHeight;
    return completed;
  });

  // Initializes the counter...
  const start = performance.now();

  // Executes the user-defined initial callback...
  userOptions.initScrollCallback && userOptions.initScrollCallback();

  return new Promise((resolve) => {
    initScrollInterval = setInterval(() => {
      scrollNode(DOMElement, scrollRate).then((isAtBottom) => {
        if (isAtBottom) {
          clearInterval(initScrollInterval);
          userOptions.endScrollCallback && userOptions.endScrollCallback();

          // Scroll is complete...
          const scrollTime = performance.now() - start;
          resolve(scrollTime);
        }
      });
    }, updateRate);
  }).catch((error) => {
    clearInterval(initScrollInterval);
    throw error;
  });

}

export default scroll;
