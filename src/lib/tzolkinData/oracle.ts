
import { getKinComponents } from './calculations';
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

// Calculate Kin number from tone and seal numbers
const calculateKinNumber = (toneNumber: number, sealNumber: number): number => {
  // Formula: (tone - 1) * 20 + seal
  let kinNumber = ((toneNumber - 1) * 20 + sealNumber) % 260;
  // Handle the case where result is 0
  return kinNumber || 260;
};

export const calculateOracle = (kin: number) => {
  // First, get the components of the Kin
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Get the seal number (1-20)
  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  const sealNumber = sealIndex + 1;  // Convert from 0-index to 1-index
  
  // Calculate seal positions for each Oracle position
  
  // 1. Calculate analog seal (analog = 19 - seal number)
  let analogSealNumber = 19 - sealNumber;
  if (analogSealNumber <= 0) analogSealNumber += 20;
  const analogSealIndex = analogSealNumber - 1; // Convert to 0-index for array access
  
  // 2. Calculate antipode seal (antipode = seal number + 10)
  let antipodeSealNumber = sealNumber + 10;
  if (antipodeSealNumber > 20) antipodeSealNumber -= 20;
  const antipodeSealIndex = antipodeSealNumber - 1; // Convert to 0-index for array access
  
  // 3. Calculate occult (hidden) seal (hidden = 21 - seal number)
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

  // Calculate Kin numbers using the direct formula: ((tone - 1) * 20 + seal) % 260 || 260
  const guideKinNumber = calculateKinNumber(toneNumber, guideSealNumber);
  const analogKinNumber = calculateKinNumber(toneNumber, analogSealNumber);
  const antipodeKinNumber = calculateKinNumber(toneNumber, antipodeSealNumber);
  const hiddenKinNumber = calculateKinNumber(hiddenToneNumber, hiddenSealNumber);
  
  return {
    guide: {
      kin: guideKinNumber,
      tone: tone,
      seal: solarSeals[guideSealIndex],
      toneNumber: toneNumber,
      sealNumber: guideSealNumber
    },
    analog: {
      kin: analogKinNumber,
      tone: tone,
      seal: solarSeals[analogSealIndex],
      toneNumber: toneNumber,
      sealNumber: analogSealNumber
    },
    antipode: {
      kin: antipodeKinNumber,
      tone: tone,
      seal: solarSeals[antipodeSealIndex],
      toneNumber: toneNumber, 
      sealNumber: antipodeSealNumber
    },
    hidden: {
      kin: hiddenKinNumber,
      tone: galacticTones[hiddenToneIndex],
      seal: solarSeals[hiddenSealIndex],
      toneNumber: hiddenToneNumber,
      sealNumber: hiddenSealNumber
    }
  };
};
