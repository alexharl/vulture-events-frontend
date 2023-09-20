import { IEventQuery } from '../model/query';
import { useNavigate } from 'react-router-dom';
import SearchRoute from '../destinations/search';

export function navigateToSearch(navigate: ReturnType<typeof useNavigate>, query?: IEventQuery) {
  const path = SearchRoute.path as string;
  if (!query) {
    navigate(path);
  } else {
    const queryObject: { [key: string]: string } = {};
    if (query.text) queryObject.text = query.text;
    if (query.categories) queryObject.categories = query.categories?.join(',');
    if (query.limit) queryObject.limit = query.limit.toString();
    if (query.nextWeekend) queryObject.nextWeekend = '1';
    if (query.origin) queryObject.origin = query.origin;

    navigate(path + '?' + new URLSearchParams(queryObject).toString());
  }
}
