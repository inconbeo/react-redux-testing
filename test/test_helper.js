//allow create fake dom
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';




//1. set up testing environment to run like a browser in the command line
//this code below set up a fake browser for use at the command line inside of our terminal
//this helps to run tests where libraries such as mocha depends on the existence of DOM, thus have something to hook into
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = global.document.defaultView;
//we hook jquery into the fake dom, This code below means we just want jquery to be responsible for this fake window
const $ = jquery(global.window);

//2. build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  //Create a component instance of the component class
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props}/>
  </Provider>
)

  //This is how we get access to HTML from the component instance ---> MAGIC!
  return $(ReactDOM.findDOMNode(componentInstance)); //produces HTML
}

//3. build helper for simulating evnts
//adding a method to jquery, every jquery instance that we create will have access to the method (simulate)
$.fn.simulate = function(eventName, value) {
  if (value) {
    //"this" refer to the html element, the code below set the value(val) of the html element
    this.val(value)
  }
  TestUtils.Simulate[eventName](this[0]);
}

//to call simulate
// $('div').simulate



//4. set up chai-jquery
chaiJquery(chai, chai.util, $);


export { renderComponent, expect };