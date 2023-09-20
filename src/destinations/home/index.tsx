import { RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { EventCards } from '../../components/event-cards';
import { CategoryCards } from '../../components/category-cards';
import { EventList } from '../../components/event-list';
import { categories } from '../../common/categories';
import { ActionResponse } from '../../model/actionResponse';
import { IEvent } from '../../model/event';
import { getEvents, getEventsNextWeekend } from '../../api';

const HomeDestination: React.FC = () => {
  const eventsData = useLoaderData() as ActionResponse<{ eventsResponse: ActionResponse<IEvent[]>; weekendResponse: ActionResponse<IEvent[]> }>;
  const navigate = useNavigate();
  return (
    <div className="surface-ground">
      <EventCards title="Wochenende" emptyMessage={eventsData.data?.weekendResponse?.message} events={eventsData.data?.weekendResponse?.data || []} />
      <CategoryCards title="Kategorien" categories={categories} />
      <EventList
        title="Nächste Events"
        emptyMessage={eventsData.data?.eventsResponse?.message}
        events={eventsData.data?.eventsResponse?.data || []}
        onSearch={() => {
          navigate('/search');
        }}
      />
    </div>
  );
};

const HomeRoute: RouteObject = {
  path: '/',
  element: <HomeDestination />,
  loader: async () => {
    const eventsResponse = await getEvents().catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
    const weekendResponse = await getEventsNextWeekend().catch(() => ActionResponse.Error<IEvent[]>('Fehler beim Laden der Events'));
    return ActionResponse.Data({ eventsResponse, weekendResponse });
  }
};

export default HomeRoute;
