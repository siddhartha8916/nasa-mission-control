const http = require("http");

require('dotenv').config()

const app = require("./app");
const Launch = require("./models/launches.mongo");
const Planet = require("./models/planets.mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const { mongoConnect } = require("./services/mongo-database.service");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();
  
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
  });
}

startServer();
