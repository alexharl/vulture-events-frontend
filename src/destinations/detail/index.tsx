import { RouteObject, useLoaderData, useNavigate } from 'react-router-dom';
import { ActionResponse } from '../../model/actionResponse';
import { IEvent } from '../../model/event';
import { EventDetailNotFound } from '../../components/event-detail/not-found';
import { EventDetail } from '../../components/event-detail';
import { getEventById, getEvents } from '../../api';
import { navigateToSearch } from '../../common/navigation';

const EventDetailDestination: React.FC = () => {
  const response = useLoaderData() as ActionResponse<{ eventResponse: ActionResponse<IEvent>; relatedResponse: ActionResponse<IEvent[]> }>;
  const navigate = useNavigate();

  const eventResponse = response.data?.eventResponse;

  if (!eventResponse || !eventResponse.success || !eventResponse.data) {
    return <EventDetailNotFound />;
  }

  return (
    <EventDetail
      event={eventResponse.data}
      relatedEvents={response.data?.relatedResponse?.data || []}
      onBack={() => navigate(-1)}
      onFilter={q => {
        navigateToSearch(navigate, q);
      }}
    />
  );
};

const DetailRoute: RouteObject = {
  path: '/:id',
  element: <EventDetailDestination />,

  loader: async ({ request, params }) => {
    if (!params.id) return ActionResponse.Error('No id provided');
    const eventResponse = await getEventById(params.id).catch(() => ActionResponse.Error<IEvent>('Fehler beim Laden der Events'));
    let relatedResponse: ActionResponse<IEvent[]> | null = null;
    if (eventResponse.data?.categories?.length) {
      relatedResponse = await getEvents({ categories: eventResponse.data?.categories, limit: 4 });
    }

    return ActionResponse.Data({ eventResponse, relatedResponse });
  }
};

export default DetailRoute;
