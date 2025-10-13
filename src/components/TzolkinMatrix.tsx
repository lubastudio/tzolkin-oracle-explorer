
import React from 'react';
import { getKinColorClass } from '@/lib/tzolkinData';

interface TzolkinMatrixProps {
  selectedKin: number;
  onKinSelect: (kin: number) => void;
}

const TzolkinMatrix: React.FC<TzolkinMatrixProps> = ({ selectedKin, onKinSelect }) => {
  const renderMatrix = () => {
    // Create an array for the 20 rows (one for each seal)
    const rows = [];
    
    // For each of the 20 seals, create a row
    for (let sealIndex = 0; sealIndex < 20; sealIndex++) {
      const cells = [];
      
      // Each row has 13 columns (one for each tone)
      for (let toneIndex = 0; toneIndex < 13; toneIndex++) {
        // Calculate the kin number based on the pattern in the image
        const kin = sealIndex + 1 + (toneIndex * 20);
        const isSelected = kin === selectedKin;
        
        cells.push(
          <div 
            key={`kin-${kin}`}
            className={`tzolkin-cell w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 border border-black text-xs flex items-center justify-center ${getKinColorClass(kin)} ${
              isSelected ? 'ring-2 ring-black scale-110' : ''
            }`}
            onClick={() => onKinSelect(kin)}
          >
            {kin}
          </div>
        );
      }
      
      rows.push(
        <div key={`seal-row-${sealIndex+1}`} className="flex flex-row -mt-px">
          {cells}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="p-4 mt-12">
      <h2 className="text-base mb-3 text-black text-center">Matriz Tzolkin</h2>
      <div className="flex flex-col items-center w-full pt-2">
        {renderMatrix()}
      </div>
    </div>
  );
};

export default TzolkinMatrix;
