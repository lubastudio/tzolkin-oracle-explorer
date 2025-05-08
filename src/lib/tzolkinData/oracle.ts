
import { getKinComponents } from './calculations';
import { solarSeals, galacticTones } from './data';

// Define the waveSealOrder for Guide calculations
// This is the fixed order of seals in a wave as specified
const waveSealOrder = [
  1,  // Dragão
  14, // Mago
  7,  // Mão
  20, // Sol
  13, // Caminhante
  6,  // Enlaçador
  19, // Tormenta
  12, // Humano
  5,  // Serpente
  18, // Espelho
  11, // Macaco
  4,  // Semente
  17, // Terra
  10, // Cachorro
  3,  // Noite
  16, // Guerreiro
  9,  // Lua
  2,  // Vento
  15, // Águia
  8   // Estrela
];

// Calculate the Oracle for a specific Kin
export const calculateOracle = (kin: number) => {
  // Get the components of the current Kin
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;
  
  // Find the seal number (1-20)
  const sealNumber = solarSeals.findIndex(s => s.name === seal.name) + 1;
  
  // Calculate Analog Seal (opposite column in Tzolkin)
  let analogSealNumber = 19 - sealNumber + 1;
  if (analogSealNumber <= 0) analogSealNumber += 20;
  
  // Calculate Antipode Kin (opposite in the 260-day cycle)
  let antipodeKin = kin + 130;
  if (antipodeKin > 260) antipodeKin -= 260;
  
  // Calculate Hidden Seal and Tone
  let hiddenSealNumber = 21 - sealNumber;
  const hiddenToneNumber = 14 - toneNumber;
  
  // Calculate the Guide Seal using the wave order
  // First, identify which position in the wave order the current seal is
  const waveOrderIndex = waveSealOrder.indexOf(sealNumber);
  
  // The guide takes the same position in the wave order, but using the tone number to determine the offset
  const guideOrderIndex = (waveOrderIndex + (toneNumber - 1)) % 20;
  const guideSealNumber = waveSealOrder[guideOrderIndex];
  
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
      kin: calculateKinNumber(
        hiddenToneNumber <= 0 ? hiddenToneNumber + 13 : hiddenToneNumber, 
        hiddenSealNumber
      ),
      seal: solarSeals[hiddenSealNumber - 1],
      tone: galacticTones[
        hiddenToneNumber <= 0 ? hiddenToneNumber + 13 - 1 : hiddenToneNumber - 1
      ],
      toneNumber: hiddenToneNumber <= 0 ? hiddenToneNumber + 13 : hiddenToneNumber,
      sealNumber: hiddenSealNumber,
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
