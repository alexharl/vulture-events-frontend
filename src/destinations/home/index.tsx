import { RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { EventList } from '../../components/event-list';
import { categories } from '../../common/categories';
import { ActionResponse } from '../../model/actionResponse';
import { IEvent } from '../../model/event';
import { getEvents, getEventsNextWeekend } from '../../api';
import { CardSlider } from '../../components/card-slider';
import { LocationBadge } from '../../components/badge/badge';
import { navigateToSearch } from '../../common/navigation';
import { Button } from 'primereact/button';

const HomeDestination: React.FC = () => {
  const eventsData = useLoaderData() as ActionResponse<{ weekendResponse: ActionResponse<IEvent[]>; featuredResponse: ActionResponse<IEvent[]>; eventsResponse: ActionResponse<IEvent[]> }>;
  const navigate = useNavigate();

  return (
    <div className="surface-ground">
      <CardSlider
        title="Wochenende"
        items={(eventsData.data?.weekendResponse?.data || []).map(event => {
          return {
            id: event.id,
            href: `/${event.id}`,
            title: event.title,
            imageUrl: event.images?.[0] || '/images/fallback-image-event.jpg',
            subtitle: event.date + (event.time ? ' ' + event.time : ''),
            content: <LocationBadge origin={event.origin} />
          };
        })}
      />

      <CardSlider
        title="Featured"
        items={(eventsData.data?.featuredResponse?.data || []).map(event => {
          return {
            id: event.id,
            href: `/${event.id}`,
            title: event.title,
            imageUrl: event.images?.[0] || '/images/fallback-image-event.jpg',
            subtitle: event.date + (event.time ? ' ' + event.time : ''),
            content: <LocationBadge origin={event.origin} />
          };
        })}
      />

      <CardSlider
        title="Kategorien"
        variant="small"
        items={categories.map(category => {
          return {
            id: category.id,
            href: `/search?categories=${category.id}`,
            title: category.name,
            imageUrl: category.image || '/images/fallback-image-event.jpg'
          };
        })}
      />

      <EventList
        title="Nächste Events"
        emptyMessage={eventsData.data?.eventsResponse?.message}
        events={eventsData.data?.eventsResponse?.data || []}
        onSearch={() => {
          navigateToSearch(navigate);
        }}
      />

      <div className="pl-3 pr-3 pb-4 flex justify-content-center">
        <Button rounded label="Alle Anzeigen" onClick={() => navigateToSearch(navigate)} />
      </div>
    </div>
  );
};

const HomeRoute: RouteObject = {
  path: '/',
  element: <HomeDestination />,
  loader: async () => {
    const weekendResponse = await getEventsNextWeekend().catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
    const featuredResponse = await getEvents({ categories: ['featured'] }).catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
    const eventsResponse = await getEvents().catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
    return ActionResponse.Data({ weekendResponse, featuredResponse, eventsResponse });
  }
};

export default HomeRoute;
