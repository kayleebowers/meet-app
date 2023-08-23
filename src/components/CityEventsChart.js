import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({events, allLocations}) => {
    // get number of events in each city
    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(", ")[0];
            return {count, city};
        })
        return data;
    }
}

export default CityEventsChart;