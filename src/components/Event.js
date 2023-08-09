// import { getEvents } from "../api";

const Event = ({ event }) => {
  return (
    <li>
        <h3>{event.summary}</h3>
        <p>{event.created}</p>
        <p>{event.location}</p>
        <button>Show Details</button>
    </li>
  )
};

export default Event;
