export const getPlural = (word: string) => {
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies";
  }

  return word + "s";
};
