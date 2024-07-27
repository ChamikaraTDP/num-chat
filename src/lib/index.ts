
export const getNewValue = (prevVal, operand, input) => {
  switch (operand) {
    case 'A': return Number(prevVal) + Number(input);
    case 'S': return Number(prevVal) - Number(input);
    case 'M': return Number(prevVal) * Number(input);
    case 'D': return Number(prevVal) / Number(input);
  }
}
