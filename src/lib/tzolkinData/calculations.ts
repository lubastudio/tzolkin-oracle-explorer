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

// Euclidean modulo helper
const emod = (n: number, m: number) => ((n % m) + m) % m;

// Calculate Kin from (seal, tone) using Chinese Remainder Theorem (no loops)
export const seloTomParaKin = (selo: number, tom: number): number => {
  const a = emod(selo - 1, 20); // 0..19
  const b = emod(tom  - 1, 13); // 0..12
  const t = emod(2 * (b - a), 13); // 2 is the inverse of 7 modulo 13
  const k0 = a + 20 * t;            // 0..259
  return (k0 % 260) + 1;            // 1..260
};

// Backwards-compatible helper: delegates to seloTomParaKin
export const calculateKinWithToneAndSeal = (toneNumber: number, sealNumber: number): number => {
  return seloTomParaKin(sealNumber, toneNumber);
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
