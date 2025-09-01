
import { getKinComponents } from './calculations';
import { solarSeals, galacticTones } from './data';

// Fixed analog table - never use formula
const ANALOGO: Record<number, number> = {
  1:18, 18:1,  2:17, 17:2,  3:16, 16:3,  4:15, 15:4,  5:14, 14:5,
  6:13, 13:6,  7:12, 12:7,  8:11, 11:8,  9:10, 10:9, 19:20, 20:19
};

// Guide calculation function
const guiaSelo = (selo: number, tom: number): number => {
  if ([1, 6, 11].includes(tom)) return selo; // AUTOGUIA
  // demais tons seguem offsets por tom:
  if ([2, 7, 12].includes(tom)) return ((selo - 1 + 12) % 20) + 1;
  if ([3, 8, 13].includes(tom)) return ((selo - 1 + 4)  % 20) + 1;
  if ([4, 9].includes(tom))     return ((selo - 1 + 16) % 20) + 1; // -4
  if ([5, 10].includes(tom))    return ((selo - 1 + 8)  % 20) + 1;
  return selo;
};

// Hidden Kin calculation - correct formula: 261 - Kin
const ocultoDeKin = (kin: number) => {
  const k = 261 - kin;        // 1..260
  const tom  = ((k - 1) % 13) + 1;
  const selo = ((k - 1) % 20) + 1;
  return { kin: k, tom, selo };
};

// Calculate the Oracle for a specific Kin
export const calculateOracle = (kin: number) => {
  // Get the components of the current Kin
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Find the seal number (1-20)
  const sealNumber = solarSeals.findIndex(s => s.name === seal.name) + 1;
  
  // Calculate Guide Seal using correct logic
  const guideSealNumber = guiaSelo(sealNumber, toneNumber);
  
  // Calculate Analog Seal using fixed table
  const analogSealNumber = ANALOGO[sealNumber];
  
  // Calculate Antipode Kin (same as before)
  let antipodeKin = kin + 130;
  if (antipodeKin > 260) antipodeKin -= 260;
  
  // Calculate Hidden using correct formula: 261 - kin
  const hiddenData = ocultoDeKin(kin);
  
  // Get the components for the antipode
  const antipodeComponents = getKinComponents(antipodeKin);
  
  // Create the complete oracle return object with all fields
  return {
    guide: {
      kin: calculateKinNumber(toneNumber, guideSealNumber),
      seal: solarSeals[guideSealNumber - 1],
      tone: galacticTones[toneNumber - 1],
      toneNumber,
      sealNumber: guideSealNumber,
    },
    analog: {
      kin: calculateKinNumber(toneNumber, analogSealNumber),
      seal: solarSeals[analogSealNumber - 1],
      tone: galacticTones[toneNumber - 1],
      toneNumber,
      sealNumber: analogSealNumber,
    },
    antipode: {
      kin: antipodeKin,
      seal: antipodeComponents.seal,
      tone: antipodeComponents.tone,
      toneNumber: antipodeComponents.tone.number,
      sealNumber: solarSeals.findIndex(s => s.name === antipodeComponents.seal.name) + 1,
    },
    hidden: {
      kin: hiddenData.kin,
      seal: solarSeals[hiddenData.selo - 1],
      tone: galacticTones[hiddenData.tom - 1],
      toneNumber: hiddenData.tom,
      sealNumber: hiddenData.selo,
    }
  };
};

// Helper function to calculate a specific Kin number from tone and seal numbers
const calculateKinNumber = (toneNumber: number, sealNumber: number): number => {
  let kinNumber = ((toneNumber - 1) * 20 + sealNumber);
  // Ensure the result is between 1 and 260
  while (kinNumber <= 0) kinNumber += 260;
  while (kinNumber > 260) kinNumber -= 260;
  return kinNumber;
};
