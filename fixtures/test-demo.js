'use strict';

module.exports = {
  definition: {
    id: 'test-demo',
    name: 'TEST Demo',
    hook: 'patient-view',
    description: 'Test of BPMN for CDS Implementation',
    prefetch: {
         patient: 'Patient/{{Patient.id}}'
    }
  },
  payload: {
    cards: [{
      summary: 'BPMN Test Result',
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
  },
  bpmn : {
	    container : 'HelloPatient_2.0.0',
	    process : 'HelloPatient.TestHP'
  }
};
