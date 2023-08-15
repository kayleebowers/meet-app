import nProgress from "nprogress";
import mockData from "./mock-data";

//create new array with just event locations and remove duplicated with new Set
export const extractLocations = ((events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
})

// check validity of access token
const checkToken = async (accessToken) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    const result = await response.json();
    return result;
}

// fetch events
export const getEvents = async () => {
    nProgress.start();
    // use mock data in localhost
    if (window.location.href.startsWith("http://localhost")) {
        nProgress.done();
        return mockData;
    }

    // check for access token
    const token = await getAccessToken();

    // fetch event data 
    if (token) {
        removeQuery();
        const url = `https://9qqgv6yrhk.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            nProgress.done();
            return result.events;
        } else return null;
    }
};

// simplify public URL 
const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
}

// get new access token
const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);
        const response = await fetch(`https://9qqgv6yrhk.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem("access_token", access_token);
        return access_token;
    } catch (error) {
        error.json();
    }
}

//get stored access token or call new one
export const getAccessToken = async () => {

    //check if token already exists and is valid
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    // if no token, check for authorization code
    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");

        //if no auth code, redirect to Google screen for log in
        if (!code) {
            const response = await fetch ("https://9qqgv6yrhk.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url");
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};
