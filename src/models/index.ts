export enum RaceStatus {
  notStarted = 'Not started',
  inProgress = 'In progress',
  finished = 'Finished'
}

export type Ant = {
  name: string;
  length: number;
  color: string;
  weight: number;
  likelihood?: number;
  complete: boolean;
};

export type AntResponse = {
  ants: Ant[];
}