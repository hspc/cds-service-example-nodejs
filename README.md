# cds-service-example-nodejs

HSPC version of an example/mock CDS Hooks service.

[![Build Status](https://travis-ci.org/cds-hooks/cds-service-example-nodejs.svg?branch=master)](https://travis-ci.org/cds-hooks/cds-service-example-nodejs)
[![devDependency Status](https://david-dm.org/cds-hooks/cds-service-example-nodejs.svg)](https://david-dm.org/cds-hooks/cds-service-example-nodejs)

Simple nodejs server that acts as a set of CDS services

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
```

Upload it to your repository:
```bash
$ docker push <your-name>/cds-service-example-nodejs .
```

## Adding a fixture
A fixture for the cds-service-example-nodejs project is implemented as a javascript module that exports two properties: `definition` and `payload`.

The `definition` property describes the service as it would be exposed through the `/cds-services` endpoint. The schema for the service definition is available at the [CDS Hooks Discovery documentation page](http://cds-hooks.github.io/docs/#discovery).

The `payload` property is the payload that will be returned from the `/cds-services/fixture` endpoint. The schema for the payload is available at the [CDS Hooks Service Response documentation page](http://cds-hooks.github.io/docs/#cds-service-response). You can also use the [cds-validator](https://github.com/cds-hooks/cds-validator) project to ensure the schema payload is valid.

Prior to submitting a pull request for the fixture, please make sure that `npm test` passes the jshint.

Skeleton:

```js
'use strict';

module.exports = {
  definition: {},
  payload: {}
}
```

## Notes
Thank you to [Josh Mandel](https://github.com/jmandel) and [Kevin Shekleton](https://github.com/kpshek) for the cds-hooks project, a JSON-based mechanism for EMR systems to provide decision support tools from within a clinician's workflow.
