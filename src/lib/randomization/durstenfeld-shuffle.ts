// The Durstenfeld shuffle is more efficient for some use cases. 
// It produces a random permutation of the original array in place.
export function durstenfeldShuffle<T>(array: T[]): T[] {
  // Create a shallow copy of the original array
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const elementToSwap = shuffledArray[randomIndex];
    const lastElement = shuffledArray[i];

    // Swap elements at i and randomIndex
    shuffledArray[i] = elementToSwap;
    shuffledArray[randomIndex] = lastElement;
  }

  return shuffledArray;
}

// // Example usage:
// const originalArray = [1, 2, 3, 4, 5];
// const shuffledArray = durstenfeldShuffle(originalArray);
// console.log(shuffledArray); // Output will be a random permutation of the originalArray
