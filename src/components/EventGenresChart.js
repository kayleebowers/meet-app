import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const EventGenresChart = ({events}) => {
    const [data, setData] = useState([]);
    const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];

    // get data only on event change
    useEffect(() => {
        setData(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, JSON.stringify(events));

    // calculate number of genre events from data
    const getData = () => {
        const data = genres.map((genre) => {
            const genreEventsNumber = events.filter((event) => event.summary.includes(genre)).length;
            return {
                name: genre,
                value: genreEventsNumber
            };
        });
        return data;
    }
}

export default EventGenresChart;