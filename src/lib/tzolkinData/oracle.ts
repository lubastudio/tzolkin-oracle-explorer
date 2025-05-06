
import { getKinComponents } from './calculations';
import { calculateKinWithToneAndSeal } from './calculations';
import { solarSeals } from './data';

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
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Get the seal number (1-20)
  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  const sealNumber = sealIndex + 1;  // Convert from 0-index to 1-index
  
  // 1. Calculate analog seal (19 - seal number)
  // CORREÇÃO: Todos os elementos mantêm o mesmo tom do Kin principal
  let analogSealNumber = 19 - sealNumber;
  if (analogSealNumber <= 0) analogSealNumber += 20;
  
  // 2. Calculate antipode seal (seal number + 10)
  let antipodeSealNumber = sealNumber + 10;
  if (antipodeSealNumber > 20) antipodeSealNumber -= 20;
  
  // 3. Calculate occult (hidden) seal (21 - seal number)
  let hiddenSealNumber = 21 - sealNumber;
  // Occult tone (14 - tone number)
  let hiddenToneNumber = 14 - toneNumber;
  if (hiddenToneNumber < 1) hiddenToneNumber += 13;
  
  // 4. Calculate guide
  let guideSealNumber;

  // Special cases for tones 1, 6, and 11 - guide is the kin's own seal
  if (toneNumber === 1 || toneNumber === 6 || toneNumber === 11) {
    guideSealNumber = sealNumber;
  } else {
    // For all other tones, use the guide sequence for the seal
    // Calculate the index in the sequence based on the tone
    const sequenceIndex = (toneNumber - 1) % 5;
    guideSealNumber = guideSequences[sealNumber][sequenceIndex];
  }
  
  // CORREÇÃO: Todos têm o mesmo tom do Kin principal, EXCETO o oculto
  return {
    guide: calculateKinWithToneAndSeal(toneNumber, guideSealNumber),
    analog: calculateKinWithToneAndSeal(toneNumber, analogSealNumber),
    antipode: calculateKinWithToneAndSeal(toneNumber, antipodeSealNumber),
    hidden: calculateKinWithToneAndSeal(hiddenToneNumber, hiddenSealNumber)
  };
};
