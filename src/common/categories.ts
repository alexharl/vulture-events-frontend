import { ICategory } from '../model/category';

export function resolveCategoriesFromId(ids?: string[]) {
  if (!ids) {
    return [];
  }
  return ids.map(id => categories.find(c => c.id === id)).filter(c => c !== undefined) as ICategory[];
}

export const categories: ICategory[] = [
  {
    id: 'dnb',
    name: 'Drum & Bass',
    image: '/images/categories/dnb.jpg'
  },
  {
    id: 'hiphop',
    name: 'Hip-Hop',
    image: '/images/categories/hiphop.jpg'
  },
  {
    id: 'punk',
    name: 'Punk',
    image: '/images/categories/punk.jpg'
  },
  {
    id: 'rock',
    name: 'Rock',
    image: '/images/categories/rock.jpg'
  },
  {
    id: 'pop',
    name: 'Pop',
    image: '/images/categories/pop.jpg'
  },
  {
    id: 'rap',
    name: 'Rap',
    image: '/images/categories/rap.jpg'
  },
  {
    id: 'techno',
    name: 'Techno',
    image: '/images/categories/techno.jpg'
  },
  {
    id: 'psy',
    name: 'Psy / Goa',
    image: '/images/categories/psy.jpg'
  },
  {
    id: 'dub',
    name: 'Dub / Reggae',
    image: '/images/categories/dub.jpg'
  },
  {
    id: 'sonstiges',
    name: 'Sonstiges'
  }
];
