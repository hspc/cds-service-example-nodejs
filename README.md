# cds-service-example-nodejs

HSPC BPMN version of an CDS Hooks wrapper service.


## Usage
This card service can be deployed with docker. By default, the Dockerfile exposes port 9000. You can bulid your own docker images with:

```bash
$ docker build -t <your-name>/cds-service-example-nodejs .
Successfully built <container-id>
Successfully tagged <your-name>/cds-service-example-nodejs
```

Run it as a daemon:
```bash
$ docker run -p 9000:9000 -d --rm --name cds-hooks <your-name>/cds-service-example-nodejs
```

Run it interactively:
```bash
$ docker run -p 9000:9000 -it --rm --name cds-hooks <your-name>/cds-service-example-nodejs

Upload it to your repository:
```bash
$ docker push <your-name>/cds-service-example-nodejs .
```

## Adding a new process
A fixture for the cds-service-example-nodejs project is implemented as a javascript module that exports two properties: `definition` and `payload`.

The `definition` property describes the service as it would be exposed through the `/cds-services` endpoint. The schema for the service definition is available at the [CDS Hooks Discovery documentation page](http://cds-hooks.github.io/docs/#discovery).

The `payload` property is the payload that will be returned from the `/cds-services/fixture` endpoint. The schema for the payload is available at the [CDS Hooks Service Response documentation page](http://cds-hooks.github.io/docs/#cds-service-response). You can also use the [cds-validator](https://github.com/cds-hooks/cds-validator) project to ensure the schema payload is valid.

The `bpmn` property is the bpmn configuration for starting workflow process. The following is an example
  bpmn : {
	    container : 'HelloPatient_1.0.0',
	    process : 'HelloPatient.HelloPatientMini'
  }
  These values combined with the urlBase from the configuraitons will define the URL end point

Prior to submitting a pull request for the fixture, please make sure that `npm test` passes the jshint.

Skeleton:

```js
'use strict';

module.exports = {
  definition: {},
  payload: {}
}


Curl Test to BPMN

curl -X POST "https://bpmn.hspconsortium.org/kie-server/services/rest/server/containers/HelloPatient_1.0.0/processes/HelloPatient.HelloPatientMini/instances"  -H "accept: application/json" -H "content-type: application/json" -d "{\"PatientId\":\"SMART-1288992\",\"FHIRUrl\":\"https://api.hspconsortium.org/cdshooksdstu2/open\"}" -H "Authorization: Basic a2llc2VydmVyOmtpZXNlcnZlcjEh"

 
 

