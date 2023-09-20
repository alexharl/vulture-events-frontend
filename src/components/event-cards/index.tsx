import { Link } from 'react-router-dom';
import { IEvent } from '../../model/event';
import './index.css';

interface IEventCardsProps {
  title: string; // title of the section
  events: IEvent[];
  emptyMessage?: string;
}
export const EventCards: React.FC<IEventCardsProps> = ({ events, title, emptyMessage }) => {
  return (
    <>
      <h2 className="pl-3 pr-3 text-color">{title}</h2>
      <div className="white-space-nowrap overflow-x-auto">
        <div className="flex inline-block pb-2 mr-2">
          {events.map((event, i) => (
            <div key={event.id} className="ml-3 mr-1">
              <Link to={`/${event.id}`} className="text-color" style={{ textDecoration: 'none' }}>
                <EventCardItem event={event} />
              </Link>
            </div>
          ))}
        </div>
        {!events.length && emptyMessage && <div className="text-center text-color pt-2">{emptyMessage}</div>}
      </div>
    </>
  );
};

interface IEventCardItemProps {
  event: IEvent;
}
export const EventCardItem: React.FC<IEventCardItemProps> = ({ event }) => {
  const imageUrl = event.images?.[0] || '/images/fallback-image-event.jpg';
  return (
    <div className="">
      <div className="event-card overflow-hidden border-round-2xl flex p-0 align-items-end shadow-2 relative" style={{ backgroundImage: `url(${imageUrl})` }}>
        {event.origin === 'rakete' && (
          <div className="absolute" style={{ top: '15px', right: '0px', width: '75px', height: '37px', backgroundColor: 'black' }}>
            <img className="w-full" src="/images/locations/logo-rakete.png" alt="Logo Rakete" />
          </div>
        )}
        {event.origin === 'zbau' && (
          <div className="absolute" style={{ top: '15px', right: '0px', width: '75px', height: '37px', backgroundColor: 'white' }}>
            <img className="w-full" src="/images/locations/logo-zbau.png" alt="Logo ZBau" />
          </div>
        )}
        <div className="white-space-normal text-primary p-2 w-full event-info border-round">
          <h3 className="m-0">{event.title}</h3>
          <p className="m-0">
            <span>{event.date}</span>
            {event.time && <span className="ml-2">{event.time}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};
