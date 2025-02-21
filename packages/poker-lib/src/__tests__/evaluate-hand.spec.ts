import { evaluatePokerHand } from '../evaluate-hand';

const TEST_CASES = [
  {
    handA: '2H 3H 4H 5H 6H',
    handB: 'KS AS TS QS JS',
    result: -1,
  },
  {
    handA: '2H 3H 4H 5H 6H',
    handB: 'AS AD AC AH JD',
    result: 1,
  },
  {
    handA: 'AS AH 2H AD AC',
    handB: 'JS JD JC JH 3D',
    result: 1,
  },
  {
    handA: '2S AH 2H AS AC',
    handB: 'JS JD JC JH AD',
    result: -1,
  },
  {
    handA: '2S AH 2H AS AC',
    handB: '2H 3H 5H 6H 7H',
    result: 1,
  },
  {
    handA: 'AS 3S 4S 8S 2S',
    handB: '2H 3H 5H 6H 7H',
    result: 1,
  },
  {
    handA: '2H 3H 5H 6H 7H',
    handB: '2S 3H 4H 5S 6C',
    result: 1,
  },
  {
    handA: '2S 3H 4H 5S 6C',
    handB: '3D 4C 5H 6H 2S',
    result: 0,
  },
  {
    handA: '2S 3H 4H 5S 6C',
    handB: 'AH AC 5H 6H AS',
    result: 1,
  },
  {
    handA: '2S 2H 4H 5S 4C',
    handB: 'AH AC 5H 6H AS',
    result: -1,
  },
  {
    handA: '2S 2H 4H 5S 4C',
    handB: 'AH AC 5H 6H 7S',
    result: 1,
  },
  {
    handA: '6S AD 7H 4S AS',
    handB: 'AH AC 5H 6H 7S',
    result: -1,
  },
  {
    handA: '2S AH 4H 5S KC',
    handB: 'AH AC 5H 6H 7S',
    result: -1,
  },
  {
    handA: '2S 3H 6H 7S 9C',
    handB: '7H 3C TH 6H 9S',
    result: -1,
  },
  {
    handA: '4S 5H 6H TS AC',
    handB: '3S 5H 6H TS AC',
    result: 1,
  },
  {
    handA: '2S AH 4H 5S 6C',
    handB: 'AD 4C 5H 6H 2C',
    result: 0,
  },
];

describe('Evaluate hand', () => {
  describe('evaluate', () => {
    it('should compare two poker hands', () => {
      TEST_CASES.forEach((testCase) => {
        expect(evaluatePokerHand(testCase.handA, testCase.handB)).toBe(
          testCase.result,
        );
      });
    });

    it('should throw an error when an incorrect hand is provided', () => {
      expect(() =>
        evaluatePokerHand('1S 5H 6H TS AC', TEST_CASES[0].handA),
      ).toThrow('Incorrect card hands provided');
    });
  });
});
