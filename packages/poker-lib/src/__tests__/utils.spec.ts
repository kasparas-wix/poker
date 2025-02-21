import { Card } from '../types';
import {
  compareHighestCard,
  isFourOfAKind,
  isFullHouse,
  isHandCorrect,
  isPair,
  isRoyalFlush,
  isStraight,
  isStraightFlush,
  isThreeOfAKind,
  isTwoPairs,
  sortByValue,
} from '../utils';

describe('Utils', () => {
  describe('helper functions', () => {
    it('should sort card according to their value', () => {
      let origHand: Card[] = ['2S', '4S', '3S', 'AS', 'TS'];
      let sortedHand: Card[] = ['2S', '3S', '4S', 'TS', 'AS'];
      expect(sortByValue(origHand)).toStrictEqual(sortedHand);

      origHand = ['KH', 'QS', '7D', '2S', 'AC'];
      sortedHand = ['2S', '7D', 'QS', 'KH', 'AC'];
      expect(sortByValue(origHand)).toStrictEqual(sortedHand);
    });

    it('should determine if a hand is Straight', () => {
      const hand1: Card[] = ['2S', '4S', '3H', 'AS', 'TC'];
      const hand2: Card[] = ['2H', '4S', '3D', '6S', '5C'];

      expect(isStraight(hand1)).toBe(false);
      expect(isStraight(hand2)).toBe(true);
    });

    it('should determine if a hand is Four of a kind', () => {
      const hand1: Card[] = ['2S', '4S', '3H', 'AS', 'TC'];
      const hand2: Card[] = ['2H', '4H', '3D', '6H', '5H'];
      const hand3: Card[] = ['JS', 'JD', 'JC', 'JH', 'AD'];

      expect(isFourOfAKind(hand1)).toBe(false);
      expect(isFourOfAKind(hand2)).toBe(false);
      expect(isFourOfAKind(hand3)).toBe(true);
    });

    it('should determine if a hand is Straight flush', () => {
      const hand1: Card[] = ['2S', '4S', '3H', 'AS', 'TC'];
      const hand2: Card[] = ['6H', '7H', '8D', '9H', 'TH'];
      const hand3: Card[] = ['2H', '3H', '4H', '5H', '6H'];

      expect(isStraightFlush(hand1)).toBe(false);
      expect(isStraightFlush(hand2)).toBe(false);
      expect(isStraightFlush(hand3)).toBe(true);
    });

    it('should determine if a hand is Royal flush', () => {
      const hand1: Card[] = ['2S', '4S', '3H', 'AS', 'TC'];
      const hand2: Card[] = ['TH', 'JH', 'QD', 'KH', 'AH'];
      const hand3: Card[] = ['TH', 'JH', 'QH', 'KH', 'AH'];

      expect(isRoyalFlush(hand1)).toBe(false);
      expect(isRoyalFlush(hand2)).toBe(false);
      expect(isRoyalFlush(hand3)).toBe(true);
    });

    it('should determine if a hand is Three of a kind', () => {
      const hand1: Card[] = ['2S', '4S', '3H', 'AS', 'TC'];
      const hand2: Card[] = ['2H', 'JH', '2D', '3H', '3C'];
      const hand3: Card[] = ['5H', 'JH', '5C', '5S', 'AH'];

      expect(isThreeOfAKind(hand1)).toBe(false);
      expect(isThreeOfAKind(hand2)).toBe(false);
      expect(isThreeOfAKind(hand3)).toBe(true);
    });

    it('should determine if a hand is Full house', () => {
      const hand1: Card[] = ['2S', '4S', '2H', 'AS', '2C'];
      const hand2: Card[] = ['2H', 'JH', '2D', '3H', '3C'];
      const hand3: Card[] = ['5H', 'JS', '5C', '5S', 'JH'];

      expect(isFullHouse(hand1)).toBe(false);
      expect(isFullHouse(hand2)).toBe(false);
      expect(isFullHouse(hand3)).toBe(true);
    });

    it('should determine if a hand is Two pairs', () => {
      const hand1: Card[] = ['2S', '4S', '2H', 'AS', '2C'];
      const hand2: Card[] = ['5H', 'JS', '5C', '5S', 'JH'];
      const hand3: Card[] = ['2H', 'JH', '2D', '3H', '3C'];

      expect(isTwoPairs(hand1)).toBe(false);
      expect(isTwoPairs(hand2)).toBe(true);
      expect(isTwoPairs(hand3)).toBe(true);
    });

    it('should determine if a hand is Pair', () => {
      const hand1: Card[] = ['7S', '4S', '2H', 'AS', '6C'];
      const hand2: Card[] = ['5H', 'TS', '5C', 'AS', 'JH'];
      const hand3: Card[] = ['2H', 'JH', '2D', '3H', '3C'];

      expect(isPair(hand1)).toBe(false);
      expect(isPair(hand2)).toBe(true);
      expect(isPair(hand3)).toBe(true);
    });

    it('should compare highest cards between hands', () => {
      const hand1: Card[] = ['7S', '4S', '2H', 'KS', '6C'];
      const hand2: Card[] = ['5H', 'TS', '5C', 'KS', 'JH'];
      const hand3: Card[] = ['5H', 'TS', '5C', 'AS', 'JH'];
      const hand4: Card[] = ['5H', 'TS', '5C', 'QS', 'JH'];
      const hand5: Card[] = ['QH', '5S', 'JC', '5C', 'TH'];

      expect(compareHighestCard(hand1, hand2)).toBe(-1);
      expect(compareHighestCard(hand1, hand3)).toBe(-1);
      expect(compareHighestCard(hand3, hand4)).toBe(1);
      expect(compareHighestCard(hand4, hand5)).toBe(0);
    });

    it('should determine if a hand is correct', () => {
      const hand1 = '7S 4S 2H AS 6C';
      const hand2 = '1S 4S 2H AS 6C';
      const hand3 = '7S 7S 2H AS 6C';
      const hand4 = '7K 5S 2H AS 6C';

      expect(isHandCorrect(hand1)).toBe(true);
      expect(isHandCorrect(hand2)).toBe(false);
      expect(isHandCorrect(hand3)).toBe(false);
      expect(isHandCorrect(hand4)).toBe(false);
    });
  });
});
