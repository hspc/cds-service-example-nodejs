'use strict';

module.exports = {
  definition: {
    id: 'bpmn-demo',
    name: 'BPMN Demo',
    hook: 'patient-view',
    description: 'Demostration of BPMN for CDS Implementation',
    prefetch: {
         patient: 'Patient/{{Patient.id}}'
    }
  },
  payload: {
    cards: [{
      summary: 'BPMN Example Result',
      detail: 'Use Plan 123',
      source: {
        label: 'Healthwise',
        url: 'http://www.healthwise.org'
      },
      indicator: 'info'
    }]
  },
  request:{ 
	PatientId: '7794', 
	FHIRUrl: 'https://api-v5-dstu2.hspconsortium.org/bpmn/open'
  }
};
