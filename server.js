'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');



var config = require('config');

const PORT = process.env.PORT || 9000;

var bodyParser = require('body-parser');

const app = express();

app.use(cors({
	credentials : true,
	methods : [ 'GET', 'POST', 'OPTIONS' ],
}));

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	fs.readdir(__dirname + '/fixtures', function(err, items) {
		var files = items.map(function(item) {
			return path.basename(item, '.js');
		});

		res.render('index', {
			fixtures : files
		});
	});
});

app.get('/cds-services/:name', function(req, res) {
	var fixture = require('./fixtures/' + req.params.name);
	res.json(fixture.payload);
});

app.post('/cds-services/:name', function(req, res) {

	var cdsHookRequest = req.body;

	console.log('cdsHookRequest:', cdsHookRequest);

	console.log('fhirServer ' + cdsHookRequest.fhirServer);

	console.log('patientId ' + cdsHookRequest.context.patientId);

	var fixture = require('./fixtures/' + req.params.name);

	var headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Basic a2llc2VydmVyOmtpZXNlcnZlcjEh'
	};

	var initiateBPMNRequest = require('request');

	var bpmnInstanceId = 'NONE';

	var bpmnurlbase = config.get('BPMN.urlBase');

	var startProcessURL = bpmnurlbase + '/' + fixture.bpmn.container + '/processes/' + fixture.bpmn.process + '/instances';

	console.log('startProcessURL ' + startProcessURL);
	// url:
	// 'http://kie.trisotech.com:8080/kie-server/services/rest/server/containers/HelloPatient_1.0.0/processes/HelloPatient.HelloPatientMini/instances',

	var initiateBPMNoptions = {
		url : startProcessURL,
		method : 'POST',
		headers : headers,
		body : '{"PatientId":"' + cdsHookRequest.context.patientId + '","FHIRUrl":"' + cdsHookRequest.fhirServer + '"}'
	};
	// '+ cdsHookRequest.context.patientId+'

	// https://api-v5-dstu2.hspconsortium.org/bpmn/open

	initiateBPMNRequest(initiateBPMNoptions, function(error, response, body) {
		console.log('start error:', error);
		console.log('start statusCode:', response && response.statusCode);
		console.log('start body:', body);
		bpmnInstanceId = body;
		console.log('bpmnInstanceId:', bpmnInstanceId);

		// need to get result if process not finished versus a loop
		for (var i = 0; i < 10000; i++) {
			var remainder = i % 1000;
			if (remainder === 0) {
				console.log('BPMN quick pause for the cause');
			}
		}

		var request = require('request');

		var resultUrl = bpmnurlbase + '/' + fixture.bpmn.container + '/processes/instances/' + bpmnInstanceId + '/variables/instances';
		// var resultUrl =
		// 'http://kie.trisotech.com:8080/kie-server/services/rest/server/containers/HelloPatient_1.0.0/processes/instances/'+bpmnInstanceId+'/variables/instances';

		console.log('BPMN Status URL ' + resultUrl);

		var options = {
			url : resultUrl,
			method : 'GET',
			headers : headers
		};

		request(options, function(error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); 
			console.log('body:', body); 
			if (response.statusCode === 200 || response.statusCode === 201) {
				var results = JSON.parse(body);
				console.log('parsed :', results); // Print the HTML for the
													// Google homepage.
				var values = results['variable-instance'];

				for (var i = 0; i < values.length; i++) {
					if (values[i].name === 'TreatmentPlanChoice') {
						fixture.payload.cards[0].detail = values[i].value;
					}
				}
			} else {
				fixture.payload.cards[0].detail = 'ERROR, INVALID PATIENT ID ' + cdsHookRequest.context.patientId;
			}
			res.json(fixture.payload);
		});

	});
});

app.get('/cds-services', function(req, res) {
	var services = [ 'bpmn-demo' ].map(function(item) {
		return require('./fixtures/' + item).definition;
	});

	res.json({
		services : services
	});
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
