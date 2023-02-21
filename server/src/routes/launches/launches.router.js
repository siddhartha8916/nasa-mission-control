const express = require('express');

const { httpGetAllLaunches, httpCreateLaunch, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpCreateLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;