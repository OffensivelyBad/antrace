import * as util from '../utils.ts';
import { ExampleAnt, ExampleAntComplete, ExampleAnts } from '../models';

describe("getCompleteStatus", () => {
    test("returns the race status accurately", () => {
        const incomplete = util.getCompleteStatus(ExampleAnts);
        const complete = util.getCompleteStatus([ExampleAntComplete]);
        expect(incomplete).toBeFalsy();
        expect(complete).toBeTruthy();
    });
})
