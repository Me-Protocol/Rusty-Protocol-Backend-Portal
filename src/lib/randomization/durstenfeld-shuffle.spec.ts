import { durstenfeldShuffle } from './durstenfeld-shuffle';

describe('shuffleArray', () => {
  it('should shuffle an array', () => {
    // Arrange
    const originalArray = [1, 2, 3, 4, 5];

    // Act
    const shuffledArray = durstenfeldShuffle(originalArray);

    // Assert
    expect(shuffledArray).not.toEqual(originalArray); // Check if the array is shuffled
    expect(shuffledArray).toHaveLength(originalArray.length); // Check if the length remains the same
    expect([...new Set(shuffledArray)]).toEqual(originalArray); // Check if all original elements are still present
  });
});
