
import { getKinComponents } from './calculations';
import { calculateKinWithToneAndSeal } from './calculations';

export const calculateOracle = (kin: number) => {
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Get the seal number (1-20)
  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  const sealNumber = sealIndex + 1;  // Convert from 0-index to 1-index
  
  // 1. Calculate analog seal (19 - seal number)
  let analogSealNumber = 19 - sealNumber;
  if (analogSealNumber < 1) analogSealNumber += 20;
  // Analog tone is same as kin tone
  const analogToneNumber = toneNumber;
  
  // 2. Calculate antipode seal (seal number + 10)
  let antipodeSealNumber = sealNumber + 10;
  if (antipodeSealNumber > 20) antipodeSealNumber -= 20;
  // Antipode tone is same as kin tone
  const antipodeToneNumber = toneNumber;
  
  // 3. Calculate occult (hidden) seal (21 - seal number)
  let hiddenSealNumber = 21 - sealNumber;
  if (hiddenSealNumber < 1) hiddenSealNumber += 20;
  // Occult tone (14 - tone number)
  let hiddenToneNumber = 14 - toneNumber;
  if (hiddenToneNumber < 1) hiddenToneNumber += 13;
  
  // 4. Calculate guide
  // Special cases for tones 1, 6, and 11 - guide is the kin itself
  if (toneNumber === 1 || toneNumber === 6 || toneNumber === 11) {
    return {
      guide: kin,
      analog: calculateKinWithToneAndSeal(analogToneNumber, analogSealNumber),
      antipode: calculateKinWithToneAndSeal(antipodeToneNumber, antipodeSealNumber),
      hidden: calculateKinWithToneAndSeal(hiddenToneNumber, hiddenSealNumber)
    };
  } else {
    // For other tones, calculate the guide based on color family
    // Color families: Red (1,5,9,13,17), White (2,6,10,14,18), Blue (3,7,11,15,19), Yellow (4,8,12,16,20)
    const colorFamily = Math.ceil(sealNumber / 4);
    
    // Use the (tone - 1) % 5 pattern to find the guide seal within the same color family
    let guideSealOffset = (toneNumber - 1) % 5;
    if (guideSealOffset === 0) guideSealOffset = 5;
    
    // Calculate guide seal number based on color family and offset
    let guideSealNumber = (colorFamily - 1) * 4 + guideSealOffset;
    if (guideSealNumber > 20) guideSealNumber = guideSealNumber - 20;
    if (guideSealNumber <= 0) guideSealNumber = guideSealNumber + 20;
    
    return {
      guide: calculateKinWithToneAndSeal(toneNumber, guideSealNumber),
      analog: calculateKinWithToneAndSeal(analogToneNumber, analogSealNumber),
      antipode: calculateKinWithToneAndSeal(antipodeToneNumber, antipodeSealNumber),
      hidden: calculateKinWithToneAndSeal(hiddenToneNumber, hiddenSealNumber)
    };
  }
};

import { solarSeals } from './data';
