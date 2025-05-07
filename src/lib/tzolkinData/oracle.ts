
import { getKinComponents } from './calculations';
import { solarSeals, galacticTones } from './data';

// Guide sequences for each seal (1-20)
const guideSequences: Record<number, number[]> = {
  1: [1, 13, 5, 17, 9],
  2: [2, 14, 6, 18, 10],
  3: [3, 15, 7, 19, 11],
  4: [4, 16, 8, 20, 12],
  5: [5, 17, 9, 1, 13],
  6: [6, 18, 10, 2, 14],
  7: [7, 19, 11, 3, 15],
  8: [8, 20, 12, 4, 16],
  9: [9, 1, 13, 5, 17],
  10: [10, 2, 14, 6, 18],
  11: [11, 3, 15, 7, 19],
  12: [12, 4, 16, 8, 20],
  13: [13, 5, 17, 9, 1],
  14: [14, 6, 18, 10, 2],
  15: [15, 7, 19, 11, 3],
  16: [16, 8, 20, 12, 4],
  17: [17, 9, 1, 13, 5],
  18: [18, 10, 2, 14, 6],
  19: [19, 11, 3, 15, 7],
  20: [20, 12, 4, 16, 8],
};

const calculateKinNumber = (toneNumber: number, sealNumber: number): number => {
  let kinNumber = ((toneNumber - 1) * 20 + sealNumber);
  return ((kinNumber - 1) % 260) + 1;
};

export const calculateOracle = (kin: number) => {
  const { tone, seal } = getKinComponents(kin);
  const toneNumber = tone.number;

  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  const sealNumber = sealIndex + 1;

  let analogSealNumber = 19 - sealNumber;
  if (analogSealNumber <= 0) analogSealNumber += 20;

  let antipodeSealNumber = sealNumber + 10;
  if (antipodeSealNumber > 20) antipodeSealNumber -= 20;

  let hiddenSealNumber = 21 - sealNumber;
  if (hiddenSealNumber <= 0) hiddenSealNumber += 20;

  let guideSealNumber;
  if (toneNumber === 1 || toneNumber === 6 || toneNumber === 11) {
    guideSealNumber = sealNumber;
  } else {
    const sequenceIndex = Math.floor((toneNumber - 1) % 5);
    guideSealNumber = guideSequences[sealNumber][sequenceIndex];
  }

  const hiddenToneNumber = 14 - toneNumber <= 0 ? 14 - toneNumber + 13 : 14 - toneNumber;

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
      kin: calculateKinNumber(toneNumber, antipodeSealNumber),
      seal: solarSeals[antipodeSealNumber - 1],
      tone: galacticTones[toneNumber - 1],
      toneNumber,
      sealNumber: antipodeSealNumber,
    },
    hidden: {
      kin: calculateKinNumber(hiddenToneNumber, hiddenSealNumber),
      seal: solarSeals[hiddenSealNumber - 1],
      tone: galacticTones[hiddenToneNumber - 1],
      toneNumber: hiddenToneNumber,
      sealNumber: hiddenSealNumber,
    }
  };
};
