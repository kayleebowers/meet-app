/* eslint-disable react-hooks/exhaustive-deps */

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE ] = useState(32);
  const [allLocations, setAllLocations] = useState([]);

  // fetch event data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      < CitySearch allLocations={allLocations}/>
      < NumberOfEvents />
      < EventList events={events}/>
    </div>
  );
}

export default App;
