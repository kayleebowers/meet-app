/* eslint-disable react-hooks/exhaustive-deps */

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { getEvents } from './api';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE ] = useState(32);

  // fetch event data
  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      < CitySearch />
      < NumberOfEvents />
      < EventList events={events}/>
    </div>
  );
}

export default App;
