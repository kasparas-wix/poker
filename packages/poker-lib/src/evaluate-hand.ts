import { Card } from './types';
import {
  compareHighestCard,
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isHandCorrect,
  isPair,
  isRoyalFlush,
  isStraight,
  isStraightFlush,
  isThreeOfAKind,
  isTwoPairs,
} from './utils';

export function evaluatePokerHand(a: string, b: string) {
  if (!isHandCorrect(a) || !isHandCorrect(b)) {
    throw Error('Incorrect card hands provided');
  }

  const handA = a.split(' ') as Card[];
  const handB = b.split(' ') as Card[];

  const [scoreA, scoreB] = [getHandScore(handA), getHandScore(handB)];
  if (scoreA === scoreB) {
    return compareHighestCard(handA, handB);
  }

  return scoreA > scoreB ? 1 : scoreA === scoreB ? 0 : -1;
}

function getHandScore(hand: Card[]) {
  if (isRoyalFlush(hand)) {
    return 9;
  }

  if (isStraightFlush(hand)) {
    return 8;
  }

  if (isFourOfAKind(hand)) {
    return 7;
  }

  if (isFullHouse(hand)) {
    return 6;
  }

  if (isFlush(hand)) {
    return 5;
  }

  if (isStraight(hand)) {
    return 4;
  }

  if (isThreeOfAKind(hand)) {
    return 3;
  }

  if (isTwoPairs(hand)) {
    return 2;
  }

  if (isPair(hand)) {
    return 1;
  }

  return 0;
}
