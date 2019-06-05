import { PRC_CITIZEN_ID } from "./patterns";
export type ValidatorFunction = (value: any, ...options: any) => boolean;

export const prcCitizenID: ValidatorFunction = (value: string) => {
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
  const checkCode = value.substring(17).toUpperCase();
  if (PRC_CITIZEN_ID.test(value)) {
    const parityIndex =
      value
        .substring(0, 17)
        .split("")
        .map(
          (number: string, index: number) => parseInt(number) * factor[index]
        )
        .reduce((a, b) => a + b, 0) % 11;
    return `${parity[parityIndex]}` === `${checkCode}`;
  }
  return false;
};
