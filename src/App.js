import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import './App.css';
import mockData from './mock-data';
import NumberOfEvents from './components/NumberOfEvents';

function App() {
  return (
    <div className="App">
      < NumberOfEvents />
      < CitySearch />
      < EventList events={mockData}/>
    </div>
  );
}

export default App;
