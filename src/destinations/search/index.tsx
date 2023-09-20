import React from 'react';
import { RouteObject, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ActionResponse } from '../../model/actionResponse';
import { IEvent } from '../../model/event';
import { EventList } from '../../components/event-list';
import { Button } from 'primereact/button';
import { SearchFilter } from '../../components/search-filter';
import { IEventQuery } from '../../model/query';
import { getEvents } from '../../api';
import { navigateToSearch } from '../../common/navigation';

const SearchDestination: React.FC = () => {
  const eventsData = useLoaderData() as ActionResponse<IEvent[]>;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URL('http://a.b' + location.search).searchParams;
  const paramCategories = params.get('categories')?.split(',') || [];
  const query: IEventQuery = {
    text: params.get('text') || '',
    categories: paramCategories
  };

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
        <h1 className="pl-4 text-color">Suche</h1>
      </div>
      <SearchFilter
        query={query}
        onQueryChange={q => {
          navigateToSearch(navigate, q);
        }}
      />
      <EventList emptyMessage="Keine Ergebnisse" title={(eventsData.data || []).length ? (eventsData.data || []).length + ' Ergebnisse' : undefined} events={eventsData.data || []} />
    </div>
  );
};

const SearchRoute: RouteObject = {
  path: '/search',
  element: <SearchDestination />,

  loader: async ({ request, params }) => {
    const searchParams = new URL(request.url).searchParams;
    const text = searchParams.get('text') || '';
    const categories = searchParams.get('categories')?.split(',') || [];
    return await getEvents({ text, categories, limit: 200 }).catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
  }
};

export default SearchRoute;
