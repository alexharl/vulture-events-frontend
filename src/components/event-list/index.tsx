import { Link } from 'react-router-dom';
import { IEvent } from '../../model/event';

interface IEventListProps {
  title?: string;
  events: IEvent[];
  onSearch?: () => void;
  emptyMessage?: string;
}
export const EventList: React.FC<IEventListProps> = ({ events, title, onSearch, emptyMessage }) => {
  return (
    <div className="pl-3 pr-3">
      {(onSearch || title) && (
        <div className={'text-color flex align-items-center ' + (onSearch && title ? 'justify-content-between' : onSearch ? 'justify-content-end' : 'justify-content-start')}>
          {title && <h2>{title}</h2>}
          {onSearch && (
            <button className="border-none bg-transparent text-color" style={{ textDecoration: 'none' }} onClick={onSearch}>
              <i className="pi pi-sliders-v"></i>
            </button>
          )}
        </div>
      )}
      {events.map(event => (
        <div key={event.id} className="mb-3">
          <Link to={`/${event.id}`} className="text-color" style={{ textDecoration: 'none' }}>
            <EventListItem event={event} />
          </Link>
        </div>
      ))}
      {!events.length && emptyMessage && <div className="text-center text-color pt-2">{emptyMessage}</div>}
    </div>
  );
};

interface IEventListItemProps {
  event: IEvent;
}
export const EventListItem: React.FC<IEventListItemProps> = ({ event }) => {
  const imageUrl = event.images?.[0] || '/images/fallback-image-event.jpg';
  return (
    <div style={{ maxHeight: '250px' }} className="overflow-hidden border-round-xl surface-card m-0 shadow-1 flex">
      <div className="m-0 p-0 overflow-hidden flex-shrink-0" style={{ flexBasis: '25%' }}>
        <img className="block w-full max-w-full h-full" style={{ objectFit: 'cover' }} src={imageUrl} alt="IMG" />
      </div>
      <div className="p-2" style={{ flex: 1 }}>
        <div className="font-bold">{event.title}</div>
        {event.subtitle && <span>{event.subtitle}</span>}
        <div className="pt-2">
          <div className="text-sm">
            <i className="pi pi-calendar"></i>
            <span className="pl-2">{event.date}</span>
            {event.time && <span className="ml-2">{event.time}</span>}
          </div>
          <div className="text-sm pt-1">
            <i className="pi pi-map-marker"></i>
            <span className="pl-2">{event.locations?.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
