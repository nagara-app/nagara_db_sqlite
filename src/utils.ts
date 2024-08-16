export const toArray = <T>(input: T[] | T): T[] => {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
};

export const toArrayOrUndefined = <T>(input: T[] | T | undefined): T[] | undefined => {
  if (Array.isArray(input)) {
    return input;
  } else if (input !== undefined) {
    return [input] as T[];
  } else {
    return undefined;
  }
};
