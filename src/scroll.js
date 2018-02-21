const defaultOptions = {
  scrollRate : 500,
  updateRate: 10,
  fromBeginning: true,
  initScrollCallback : null,
  duringScrollCallback : null,
  endScrollCallback : null,
};

/**
 * Scrolls the given DOM Element at the given scroll rate.
 *
 * @param  {HTMLElement} DOMElement the DOM element.
 * @param  {Number} scrollRate the scroll rate (in pixels.)
 *
 * @return {Promise}
 */
const scrollDomNodeAsync = (DOMElement, scrollRate) => new Promise((resolve) => {
  requestAnimationFrame(() => {
    DOMElement.scrollTop += scrollRate;
    resolve();
  });
});

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * The scroll function.
 *
 * @param  {HTMLElement} DOMElement  the DOM element.
 * @param {Object}       userOptions the user's options.
 *
 * @return {Promise}
 */
const scroll = async(DOMElement, userOptions = {}) => {

  // Default variables...

  const options = {};

  for(let option in defaultOptions) {
    options[option] = userOptions[option] || defaultOptions[option];
  }

  let { scrollRate, updateRate } = options;
  let initScrollInterval = 0;
  let checkScrollInterval = 0;

  if (options.fromBeginning) DOMElement.scrollTop = 0;

  // Initializes the counter...
  const start = performance.now();

  // Executes the user-defined initial callback...
  options.initScrollCallback && options.initScrollCallback();

  // Scroll while we haven't reached the bottom!
  let scrollLeft = DOMElement.scrollHeight - DOMElement.scrollTop - DOMElement.clientHeight;

  while(scrollLeft > 0) {
    await scrollDomNodeAsync(DOMElement, scrollRate);
    options.duringScrollCallback && options.duringScrollCallback();
    scrollLeft = DOMElement.scrollHeight - DOMElement.scrollTop - DOMElement.clientHeight;

    // Waits the given update rate value before scrolling again.
    await sleep(options.updateRate);
  }

  options.endScrollCallback && options.endScrollCallback();

  const scrollTime = performance.now() - start;

  return scrollTime;
}

export default scroll;
