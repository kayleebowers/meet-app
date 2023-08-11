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

// fetch list of mock events
export const getEvents = async () => {
    return mockData;
}

//get access token
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
            const { authURL } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};