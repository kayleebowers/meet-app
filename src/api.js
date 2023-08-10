import mockData from "./mock-data";

//create new array with just event locations and remove duplicated with new Set
export const extractLocations = ((events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
})

// fetch list of mock events
export const getEvents = async () => {
    return mockData;
}

//get access token
export const getAccessToken = async () => {
    //check if one exists in localStorage
    const accessToken = localStorage.getItem("access_token");

    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch (
                // "YOUR_SERVERLESS_GET_AUTH_URL_ENDPOINT"
            );
            const result = await response.json();
            const { authURL } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};