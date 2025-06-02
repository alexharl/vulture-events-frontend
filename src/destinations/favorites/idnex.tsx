import React from 'react';
import { RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { ActionResponse } from '../../model/actionResponse';
import { IEvent } from '../../model/event';
import { EventList } from '../../components/event-list';
import { Button } from 'primereact/button';
import { getEventsByIds } from '../../api';

const FavoritesDestination: React.FC = () => {
  const eventsData = useLoaderData() as ActionResponse<IEvent[]>;
  const navigate = useNavigate();
  return (
    <div className="surface-ground pt-2">
      <div className="flex align-items-center pl-3 pr-3">
        <Button
          className="surface-card"
          onClick={() => {
            navigate(-1);
          }}
          icon="pi pi-arrow-left"
          rounded
          text
          raised
          aria-label="Back"
        />
        <h1 className="pl-4 text-color">Favoriten</h1>
      </div>
      <EventList
        emptyMessage="Keine Favoriten"
        title={(eventsData.data || []).length ? (eventsData.data || []).length + ' Favoriten' : undefined}
        events={eventsData.data || []}
      />
    </div>
  );
};

const FavoritesRoute: RouteObject = {
  path: '/favorites',
  element: <FavoritesDestination />,

  loader: async () => {
    var favorites = localStorage.getItem('favorites');
    if (!favorites) {
      return ActionResponse.Error<IEvent[]>('Keine Favoriten gespeichert');
    }
    var ids = JSON.parse(favorites) as string[];
    if (!ids.length) {
      return ActionResponse.Error<IEvent[]>('Keine Favoriten gespeichert');
    }
    return await getEventsByIds(ids).catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
  }
};

export default FavoritesRoute;
