const launches = new Map();

let latestFlightNumber = 100;


function getAllLaunches() {
  return Array.from(launches.values());
}

function existsLaunchWithId(launchId){
  return launches.has(launchId)
}

function addNewLaunch(launch) { 
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
      customers: ["Zero To Mastery", "NASA"],
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchWithId
};
