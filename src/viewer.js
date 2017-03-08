'use strict';
// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
var BpmnViewer = require('bpmn-js');

var viewer = new BpmnViewer({ container: '#canvas' });

var eventBus = viewer.get('eventBus');

// you may hook into any of the following events
var events = [
  'element.hover',
  'element.out',
  'element.click',
  'element.dblclick',
  'element.mousedown',
  'element.mouseup'
];

events.forEach(function(event) {
  eventBus.on(event, function(e) {
    // e.element = the model element
    // e.gfx = the graphical element
  
    console.log(event, 'on', e.element.id);
  });
});

window.viewer = viewer;