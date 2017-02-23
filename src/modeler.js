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
var xml = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
  <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
  <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
  <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
  </bpmndi:BPMNShape>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

modeler.importXML(xml, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('success!');
  }
});

window.doSaveSvg = function() {
  modeler.saveSVG(function (err, svg) {
    setEncoded(document.getElementById('svg'), 'diagram.svg', err ? null : svg);
    console.log(err);
    console.log(svg)
  });
}

window.doSaveDiagram = function() {
  modeler.saveXML({ format: true }, function(err, xml) {
    setEncoded(document.getElementById('bpmn'), 'diagram.bpmn', err ? null : xml);
    console.log(err);
    console.log(xml)
  });
}

function setEncoded(link, name, data) {
  var encodedData = encodeURIComponent(data);
  if (data) {
    link.href = 'data:application/xml;charset=UTF-8,' + encodedData;
    link.download = name;
  } else {
    link.removeClass('active');
  }
}

window.loadFileClick = function () {
  document.getElementById("files").click();
}

window.loadFile = function() {
  var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
  var name = selectedFile.name;//读取选中文件的文件名
  var size = selectedFile.size;//读取选中文件的大小
  console.log("文件名:"+name+"大小："+size);
  
  var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
  reader.readAsText(selectedFile);//读取文件的内容
  
  reader.onload = function(){
    console.log(this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
    modeler.importXML(this.result, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('success!');
      }
    });
  };
}