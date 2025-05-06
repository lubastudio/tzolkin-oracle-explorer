import { solarSeals, galacticTones, months, yearValues } from './data';

// This is the original calculation function that we'll keep for compatibility
export const calculateKin = (year: string, month: number, day: number): number => {
  const yearValue = yearValues[year as keyof typeof yearValues] || 0;
  const monthValue = months[month]?.value || 0;
  
  let sum = yearValue + monthValue + day;
  
  // If sum is greater than 260, subtract 260 until it's in range 1-260
  while (sum > 260) {
    sum -= 260;
  }
  
  return sum;
};

// New calculation function that uses the fixed tables for accurate Kin calculation
export const calculateKinAccurate = (year: number, month: number, day: number): number => {
  const yearStr = year.toString();
  
  // Check if the year exists in our table
  if (!(yearStr in yearValues)) {
    console.warn(`Year ${yearStr} not in table, calculation may be inaccurate`);
    // Use nearest year or default calculation
    return calculateKin(yearStr, month - 1, day); // month - 1 because original function uses 0-based months
  }
  
  const yearValue = yearValues[yearStr as keyof typeof yearValues];
  
  // Get month value (month is 1-based in this function)
  const monthValue = months[month - 1]?.value || 0;
  
  // Calculate the sum
  let sum = yearValue + monthValue + day;
  
  // Normalize to range 1-260
  while (sum > 260) {
    sum -= 260;
  }
  
  // For Kin 0, return Kin 260
  return sum === 0 ? 260 : sum;
};

export const getKinComponents = (kin: number): {
  tone: typeof galacticTones[number],
  seal: typeof solarSeals[number]
} => {
  // Ensure kin is between 1-260
  const normalizedKin = ((kin - 1) % 260) + 1;
  
  // Calculate tone (1-13)
  const toneIndex = (normalizedKin - 1) % 13;
  
  // Calculate seal (0-19)
  const sealIndex = (normalizedKin - 1) % 20;
  
  return {
    tone: galacticTones[toneIndex],
    seal: solarSeals[sealIndex]
  };
};

// Helper function to calculate a kin number based on tone and seal numbers
export const calculateKinWithToneAndSeal = (toneNumber: number, sealNumber: number): number => {
  // Formula: (tone - 1) * 20 + seal
  let kin = (toneNumber - 1) * 20 + sealNumber;
  
  // Ensure it's within the 1-260 range
  if (kin <= 0) kin += 260;
  if (kin > 260) kin -= 260;
  
  return kin;
};

// Get color class for a kin
export const getKinColorClass = (kin: number): string => {
  const { seal } = getKinComponents(kin);
  
  switch (seal.color) {
    case 'red':
      return 'bg-tzolkin-red text-white';
    case 'white':
      return 'bg-tzolkin-white text-black';
    case 'blue':
      return 'bg-tzolkin-blue text-white';
    case 'yellow':
      return 'bg-tzolkin-yellow text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};
