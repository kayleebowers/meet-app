import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import './App.css';
import mockData from './mock-data';
import NumberOfEvents from './components/NumberOfEvents';
import { useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE ] = useState(32);

  return (
    <div className="App">
      < NumberOfEvents />
      < CitySearch />
      < EventList events={events}/>
    </div>
  );
}

export default App;
