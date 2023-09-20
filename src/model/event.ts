export type TEventOrigin = 'zbau' | 'rakete' | 'haus33';
export interface IEvent {
  origin: TEventOrigin;
  id: string;

  url: string;
  title: string;
  subtitle?: string;

  tags?: string[];
  categories?: string[];

  info?: string;
  locations?: string[];
  ageLimit?: string;

  date?: string;
  dateUnix: number;
  time?: string;
  entryTime?: string;

  ticketLink?: string;
  price?: string;

  images?: string[];
}
