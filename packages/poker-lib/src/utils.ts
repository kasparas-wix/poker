import { Card, CardValue } from './types';

export const CARD_VALUES = '23456789TJQKA';

export function sortByValue(hand: Card[]) {
  return [...hand].sort((a, b) => {
    return CARD_VALUES.indexOf(a[0]) - CARD_VALUES.indexOf(b[0]);
  });
}

export function isStraight(hand: Card[]) {
  const sortedHand = sortByValue(hand);
  const sortedHandValues = sortedHand.map((card) => card[0]).join('');
  return CARD_VALUES.includes(sortedHandValues);
}

export function isFlush(hand: Card[]) {
  const firstSuit = hand[0][1];
  return !hand.find((card) => card[1] !== firstSuit);
}

export function isRoyalFlush(hand: Card[]) {
  const sortedHand = sortByValue(hand);
  const sortedHandValues = sortedHand.map((card) => card[0]).join('');

  return isFlush(hand) && sortedHandValues === 'TJQKA';
}

export function isStraightFlush(hand: Card[]) {
  return isStraight(hand) && isFlush(hand);
}

export function isFourOfAKind(hand: Card[]) {
  const valuesCount = hand.reduce((prev, curr) => {
    const suit = curr[0] as CardValue;
    return { ...prev, [suit]: (prev[suit] || 0) + 1 };
  }, {} as { [key in CardValue]: number });

  return !!Object.values(valuesCount).find((val) => val === 4);
}

export function isThreeOfAKind(hand: Card[]) {
  const valuesCount = hand.reduce((prev, curr) => {
    const suit = curr[0] as CardValue;
    return { ...prev, [suit]: (prev[suit] || 0) + 1 };
  }, {} as { [key in CardValue]: number });

  return !!Object.values(valuesCount).find((val) => val === 3);
}

export function isFullHouse(hand: Card[]) {
  const valuesCount = hand.reduce((prev, curr) => {
    const suit = curr[0] as CardValue;
    return { ...prev, [suit]: (prev[suit] || 0) + 1 };
  }, {} as { [key in CardValue]: number });

  return (
    !!Object.values(valuesCount).find((val) => val === 3) &&
    !!Object.values(valuesCount).find((val) => val === 2)
  );
}

export function isTwoPairs(hand: Card[]) {
  const valuesCount = hand.reduce((prev, curr) => {
    const suit = curr[0] as CardValue;
    return { ...prev, [suit]: (prev[suit] || 0) + 1 };
  }, {} as { [key in CardValue]: number });

  const numOfPairs = Object.values(valuesCount).filter(
    (count) => count >= 2,
  ).length;

  return numOfPairs === 2;
}

export function isPair(hand: Card[]) {
  const valuesCount = hand.reduce((prev, curr) => {
    const suit = curr[0] as CardValue;
    return { ...prev, [suit]: (prev[suit] || 0) + 1 };
  }, {} as { [key in CardValue]: number });

  return !!Object.values(valuesCount).find((val) => val >= 2);
}

export function compareHighestCard(a: Card[], b: Card[]) {
  const [sortedA, sortedB] = [sortByValue(a), sortByValue(b)];
  const [highestA, highestB] = [
    (sortedA.at(-1) as Card)[0],
    (sortedB.at(-1) as Card)[0],
  ];

  const compareVal =
    CARD_VALUES.indexOf(highestA) - CARD_VALUES.indexOf(highestB);

  if (compareVal === 0 && a.length > 1) {
    const newHandA = sortedA.slice(0, -1);
    const newHandB = sortedB.slice(0, -1);
    return compareHighestCard(newHandA, newHandB);
  }

  return compareVal > 0 ? 1 : compareVal === 0 ? 0 : -1;
}
