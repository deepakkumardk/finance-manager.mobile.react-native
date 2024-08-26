declare interface String {
  START: string;
  SUCCESS: string;
  FAILURE: string;

  toDouble: () => string;
  roundNumber: () => string;
  toInt: () => string;
  isNumber: () => string;
}

declare interface Number {
  toDouble: () => string;
  roundNumber: () => string;
  toInt: () => string;
  isNumber: () => string;
}
