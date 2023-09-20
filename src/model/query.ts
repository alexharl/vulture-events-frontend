export interface IEventQuery {
  origin?: string;
  text?: string;
  categories?: string[];
  nextWeekend?: boolean;
  limit?: number;
}
