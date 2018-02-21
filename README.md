# DOM Performance Tools

DOM Performance Tools library offers a set of utilities to perform performance tests in DOM elements. Currently the scroll property is supported, but we have plans to add click and other DOM events.

<div align="center">
  <img src="https://i.imgur.com/du9c0lv.gif" alt="Live demo" />
</div>

## Usage

#### Scroll

This utility scrolls the given DOM element until it reaches the end. The function call returns a promise, which will contain the time in milliseconds that the scroll operation took.

```js

function scrollElement(DOMElement, options = {}) => {

}

/// Import it to your code, like this:

import DOMTools from 'dom-performance-tools';

/// Later on...

const element = Document.getElementById('myElement');
DOMTools.scrollElement(element).then(results => {

  // Results will contain the time that it takes to scroll the element.

  console.log(results);
});
```

The function scrollElement receives an optional object parameter which allows the user to define the following settings:

| Parameter | Default | Type | Description |
|:---|:---|:---|:---|
| scrollRate | 100 | `Number` | Specifies how many pixels should'be scrolled in each update, in pixels. |
| updateRate | 100 | `Number` | Specifies how often each update will be triggered, in milliseconds. |
| fromBeginning | true | `Bool` | Specifies if the scroll action should begin from the DOM element's beginning. |
| initScrollCallback | null | `Function` | Fired after the timer starts. You can use this for any initialization event that should take place before beginning to scroll the element. |
| duringScrollCallback | null | `Function` | Fired everytime that the element is scrolled. You can use this for any intermediate event that should take place right after the scroll event. |
| endScrollCallback | null | `Function` | Fired after the element reached the bottom, but before the timer ends. You can use this for any final event that should take place before the time is returned. |

## Contributing

More tools will be added in the future. Feel free to open a PR or make an issue with your ideas.
