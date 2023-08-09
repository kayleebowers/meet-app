// import { getEvents } from "../api";

const Event = ({ event }) => {
  return (
    <li>
        <h3>{event.summary}</h3>
        <p>{event.description}</p>
        <p>{event.location}</p>
    </li>
  )
};

export default Event;
