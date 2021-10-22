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

export const ExampleAnt: Ant = {
  name: "testy",
  length: 23,
  color: "blue",
  weight: 123,
  complete: false
};

export const ExampleAntComplete: Ant = {
  name: "testy",
  length: 23,
  color: "blue",
  weight: 123,
  likelihood: 1,
  complete: true
};

export const ExampleAnts = [ExampleAnt, ExampleAntComplete];
