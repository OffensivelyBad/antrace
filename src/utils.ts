import { Ant } from "./models";
import { cloneDeep, every } from 'lodash';

const DELAY = 7000;

export function generateAntWinLikelihoodCalculator() {
  const delay = DELAY + Math.random() * DELAY;
  const likelihoodOfAntWinning = Math.random();

  return (callback: (num: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

export const promisifiedGenerateFunction = (): Promise<number> => {
  const fn = generateAntWinLikelihoodCalculator();
  return new Promise((resolve, reject) => {
    fn(num => {
      resolve(num);
    });
  });
};

export const sortAnts = (ants: Ant[]): Ant[] => {
  const newAnts = cloneDeep(ants);
  newAnts.sort((a: Ant, b: Ant) => {
    const al = a.likelihood ? a.likelihood : 0;
    const bl = b.likelihood ? b.likelihood : 0;
    return bl - al;
  });

  return newAnts;
};

export const getCompleteStatus = (ants: Ant[]): boolean => {
  let isComplete = false;
  if (ants.length) {
    isComplete = every(ants, { 'complete': true });
  }
  return isComplete;
};

export const getResetAnts = (ants: Ant[]): Ant[] => {
  let newAnts = cloneDeep(ants);
  newAnts = newAnts.map((ant: Ant) => {
    return { ...ant, likelihood: 0, complete: false };
  });
  return newAnts;
};
