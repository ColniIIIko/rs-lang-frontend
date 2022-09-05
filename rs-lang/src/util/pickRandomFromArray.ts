export const pickRandomFromArray = <T>(array: T[], amount: number, exclude?: number[]) => {
  let currentAmount = amount;
  let pickedArray = [];
  const indexArray = exclude || [];
  while (currentAmount) {
    const index = Math.round(Math.random() * (array.length - 1));
    if (!indexArray.includes(index)) {
      pickedArray.push(array[index]);
      indexArray.push(index);
      currentAmount--;
    }
  }

  return pickedArray;
};
