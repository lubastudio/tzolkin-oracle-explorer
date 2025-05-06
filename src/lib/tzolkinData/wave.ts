
// Calculate wave for a kin
export const calculateWave = (kin: number): number[] => {
  // Get the starting kin of the wave
  let waveStartKin = kin;
  
  // Find the first kin of the wave (with tone "Magnético")
  while ((waveStartKin - 1) % 13 !== 0) {
    waveStartKin--;
    if (waveStartKin < 1) {
      waveStartKin += 260;
    }
  }
  
  // Generate the 13 kins of the wave
  const waveKins: number[] = [];
  for (let i = 0; i < 13; i++) {
    let currentKin = waveStartKin + i;
    if (currentKin > 260) {
      currentKin -= 260;
    }
    waveKins.push(currentKin);
  }
  
  return waveKins;
};
