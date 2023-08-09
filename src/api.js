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