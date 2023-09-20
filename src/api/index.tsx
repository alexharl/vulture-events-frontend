import { ActionResponse } from '../model/actionResponse';
import { IEvent } from '../model/event';
import { IEventQuery } from '../model/query';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function getEventById(id: string): Promise<ActionResponse<IEvent>> {
  const response = await fetch(`${API_URL}/events/${id}`);
  return await response.json();
}

export async function getEvents(query?: IEventQuery): Promise<ActionResponse<IEvent[]>> {
  const response = await fetch(
    `${API_URL}/events?` +
      new URLSearchParams({
        text: query?.text || '',
        nextWeekend: query?.nextWeekend ? '1' : '0',
        categories: query?.categories?.join(',') || '',
        limit: query?.limit?.toString() || '',
        origin: query?.origin?.toString() || '',
      })
  );
  return await response.json();
}

export async function getEventsNextWeekend(): Promise<ActionResponse<IEvent[]>> {
  const response = await fetch(`${API_URL}/events?nextWeekend=1`);
  return await response.json();
}
