
import { getKinComponents } from './calculations';
import { calculateKinWithToneAndSeal } from './calculations';
import { solarSeals, galacticTones } from './data';

// Guide sequences for each seal (1-20)
// Each seal has 5 possible guides in a specific order
const guideSequences: Record<number, number[]> = {
  1: [1, 13, 5, 17, 9],    // Dragon
  2: [2, 14, 6, 18, 10],   // Wind
  3: [3, 15, 7, 19, 11],   // Night
  4: [4, 16, 8, 20, 12],   // Seed
  5: [5, 17, 9, 1, 13],    // Serpent
  6: [6, 18, 10, 2, 14],   // Worldbridger
  7: [7, 19, 11, 3, 15],   // Hand
  8: [8, 20, 12, 4, 16],   // Star
  9: [9, 1, 13, 5, 17],    // Moon
  10: [10, 2, 14, 6, 18],  // Dog
  11: [11, 3, 15, 7, 19],  // Monkey
  12: [12, 4, 16, 8, 20],  // Human
  13: [13, 5, 17, 9, 1],   // Skywalker
  14: [14, 6, 18, 10, 2],  // Wizard
  15: [15, 7, 19, 11, 3],  // Eagle
  16: [16, 8, 20, 12, 4],  // Warrior
  17: [17, 9, 1, 13, 5],   // Earth
  18: [18, 10, 2, 14, 6],  // Mirror
  19: [19, 11, 3, 15, 7],  // Storm
  20: [20, 12, 4, 16, 8],  // Sun
};

export const calculateOracle = (kin: number) => {
  // First, get the components of the Kin
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Get the seal number (1-20)
  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  const sealNumber = sealIndex + 1;  // Convert from 0-index to 1-index
  
  // Calculate seal positions for each Oracle position
  
  // 1. Calculate analog seal (19 - seal number)
  let analogSealNumber = 19 - sealNumber;
  if (analogSealNumber <= 0) analogSealNumber += 20;
  const analogSealIndex = analogSealNumber - 1; // Convert to 0-index for array access
  
  // 2. Calculate antipode seal (seal number + 10)
  let antipodeSealNumber = sealNumber + 10;
  if (antipodeSealNumber > 20) antipodeSealNumber -= 20;
  const antipodeSealIndex = antipodeSealNumber - 1; // Convert to 0-index for array access
  
  // 3. Calculate occult (hidden) seal (21 - seal number)
  const hiddenSealNumber = 21 - sealNumber;
  const hiddenSealIndex = hiddenSealNumber - 1; // Convert to 0-index for array access
  
  // 4. Calculate guide seal based on the specific sequence
  let guideSealNumber;

  // Special cases for tones 1, 6, and 11 - guide is the kin's own seal
  if (toneNumber === 1 || toneNumber === 6 || toneNumber === 11) {
    guideSealNumber = sealNumber;
  } else {
    // For all other tones, use the guide sequence for the seal
    // Calculate the index in the sequence based on the tone
    const sequenceIndex = Math.floor((toneNumber - 1) % 5);
    guideSealNumber = guideSequences[sealNumber][sequenceIndex];
  }
  const guideSealIndex = guideSealNumber - 1; // Convert to 0-index for array access
  
  // Calculate the occult tone (14 - tone number)
  let hiddenToneNumber = 14 - toneNumber;
  if (hiddenToneNumber <= 0) hiddenToneNumber += 13;
  const hiddenToneIndex = hiddenToneNumber - 1; // Convert to 0-index for array access
  
  // Use the correct formula to calculate the Kin numbers: (tone - 1) * 20 + seal
  // This is the critical fix - properly calculating Kin numbers
  const guideKin = calculateKinNumber(toneNumber, guideSealNumber);
  const analogKin = calculateKinNumber(toneNumber, analogSealNumber);
  const antipodeKin = calculateKinNumber(toneNumber, antipodeSealNumber);
  const hiddenKin = calculateKinNumber(hiddenToneNumber, hiddenSealNumber);
  
  return {
    guide: {
      kin: guideKin,
      tone: tone,                      // Same as original Kin's tone
      seal: solarSeals[guideSealIndex] // Guide seal
    },
    analog: {
      kin: analogKin,
      tone: tone,                      // Same as original Kin's tone 
      seal: solarSeals[analogSealIndex] // Analog seal
    },
    antipode: {
      kin: antipodeKin,
      tone: tone,                      // Same as original Kin's tone
      seal: solarSeals[antipodeSealIndex] // Antipode seal  
    },
    hidden: {
      kin: hiddenKin,
      tone: galacticTones[hiddenToneIndex], // Different tone for hidden
      seal: solarSeals[hiddenSealIndex]     // Hidden seal
    }
  };
};

// Helper function to calculate Kin number using the formula: (tone - 1) * 20 + seal
// Also normalizes the result to be within 1-260 range
const calculateKinNumber = (toneNumber: number, sealNumber: number): number => {
  let kinNumber = (toneNumber - 1) * 20 + sealNumber;
  
  // Normalize to range 1-260
  while (kinNumber <= 0) kinNumber += 260;
  while (kinNumber > 260) kinNumber -= 260;
  
  return kinNumber;
};
