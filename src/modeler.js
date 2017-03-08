'use strict';
// we use fs + brfs to inline an example XML document.
// exclude fs in package.json#browser + use the brfs transform
// to generate a clean browserified bundle
// require the viewer, make sure you added it to your project
// dependencies via npm install --save-dev bpmn-js
import './modeler.less';
var BpmnModeler = require('bpmn-js/lib/Modeler'),
  propertiesPanelModule = require('bpmn-js-properties-panel'),
  // providing camunda executable properties, too
  propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda'),
  camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');

var modeler = new BpmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  // needed if you'd like to maintain camunda:XXX properties in the properties panel
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});

window.modeler = modeler;