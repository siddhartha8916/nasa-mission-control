const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function httpGetLaunches() {
  try {
    const response = await fetch(`${API_URL}/launches`);
    const fetchedLaunches = await response.json();
    return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (error) {
    console.log(error);
  }
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return {
      ok: false,
      error: error,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return {
      ok: false,
      error: error,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
