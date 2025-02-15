export enum Status {
  suspenso = "Suspenso",
  operacional = "Operacional"
}

export type PaginationResponse<T = unknown> = {
  data: T[];
  page: number;
  perPage: number;
  totalRecord: number;
  nextPage: string;
};

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export type DefaultResponse<T = object> = {
  data: T | T[];
};
