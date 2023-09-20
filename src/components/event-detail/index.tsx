import { IEvent } from '../../model/event';
import { Chip } from 'primereact/chip';
import './index.css';
import { useEffect, useState } from 'react';
import { resolveCategoriesFromId } from '../../common/categories';
import { Button } from 'primereact/button';
import { IEventQuery } from '../../model/query';
import { EventCards } from '../event-cards';

export interface IEventDetailProps {
  event: IEvent;
  relatedEvents?: IEvent[];
  onBack?: () => void;
  onFilter?: (query: IEventQuery) => void;
}

export const EventDetail: React.FC<IEventDetailProps> = ({ event, onBack, onFilter, relatedEvents }) => {
  const [categories, setCategories] = useState(resolveCategoriesFromId(event.categories));
  useEffect(() => {
    setCategories(resolveCategoriesFromId(event.categories));
  }, [event.categories]);

  const imageUrl = event.images?.[0] || '/images/fallback-image-event.jpg';

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(window.navigator.userAgent.indexOf("Safari") != -1);
  }, []);

  return (
    <div className="relative surface-ground">
      <div className="image-container">
        <img src={imageUrl} alt="Detail" className="detail-image" />
      </div>
      {onBack && (
        <Button className={'float-top-left surface-card' + (isSafari ? ' mt-6' : '')} onClick={onBack} icon="pi pi-arrow-left" rounded text raised aria-label="Back" />
      )}
      <div className="info-sheet">
        <div className="text-color border-round-top-xl surface-ground pb-4">
          <h2 className="text-center mt-0 pt-4 mb-2">{event.title}</h2>
          {event.subtitle && <p className="text-center mt-0 mb-4">{event.subtitle}</p>}
          <div className="pl-4 pr-4">
            <div className="flex pb-3">
              <i className="pi pi-calendar"></i>
              <div className="pl-4">
                <span>{event.date}</span>
                {event.time && <span className="pl-2">{event.time}</span>}
                {event.entryTime && <span className="pl-2">({event.entryTime})</span>}
              </div>
            </div>
            {!!event.locations?.length && (
              <div className="flex pb-3">
                <i className="pi pi-map-marker"></i>
                <div className="pl-4">{event.locations?.join(', ')}</div>
              </div>
            )}
            {event.price && (
              <div className="flex pb-3">
                <i className="pi pi-dollar"></i>
                <div className="pl-4">{event.price}</div>
              </div>
            )}
            {event.ageLimit && (
              <div className="flex pb-3">
                <i className="pi pi-lock"></i>
                <div className="pl-4">{event.ageLimit}</div>
              </div>
            )}
            {event.ticketLink && (
              <div className="flex pb-3">
                <i className="pi pi-shopping-bag"></i>
                <div className="pl-4">
                  <a href={event.ticketLink}>Tickets</a>
                </div>
              </div>
            )}
          </div>
          {!!categories.length && (
            <div className="pl-4 pr-4">
              {categories.map((category, i) => (
                <Chip
                  key={category.id}
                  className={'bg-primary' + (i > 0 ? ' ml-2' : '')}
                  label={category.name}
                  onClick={() => {
                    onFilter?.({ categories: [category.id] });
                  }}
                />
              ))}
            </div>
          )}
          {event.info && (
            <div className="pl-4 pr-4">
              <h5 className="mb-2">Info</h5>
              <div dangerouslySetInnerHTML={{ __html: event.info }}></div>
              {!!event.images?.length && (
                <>
                  <h5 className="mb-2">Bilder</h5>
                  {event.images.map(image => (
                    <div className="w-full pb-2" key={image}>
                      <img style={{ width: 'inherit' }} src={image} alt="Bild" />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {!!relatedEvents?.length && (
            <div className="pb-2">
              <EventCards title="Verwandte Events" events={relatedEvents || []} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
