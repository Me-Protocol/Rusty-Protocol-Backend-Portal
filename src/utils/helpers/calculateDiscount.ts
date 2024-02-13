export const calculateDiscount = (discount: number, amount: number) => {
  // Calculate the discount amount
  const discountAmount = (amount * discount) / 100;

  // Calculate the discounted total
  const discountedTotal = amount - discountAmount;

  return discountedTotal;
};
