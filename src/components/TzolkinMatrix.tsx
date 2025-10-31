
import React from 'react';
import { getKinColorClass } from '@/lib/tzolkinData';

// Import seal SVGs
import seal1 from '@/assets/seals/1.svg';
import seal2 from '@/assets/seals/2.svg';
import seal3 from '@/assets/seals/3.svg';
import seal4 from '@/assets/seals/4.svg';
import seal5 from '@/assets/seals/5.svg';
import seal6 from '@/assets/seals/6.svg';
import seal7 from '@/assets/seals/7.svg';
import seal8 from '@/assets/seals/8.svg';
import seal9 from '@/assets/seals/9.svg';
import seal10 from '@/assets/seals/10.svg';
import seal11 from '@/assets/seals/11.svg';
import seal12 from '@/assets/seals/12.svg';
import seal13 from '@/assets/seals/13.svg';
import seal14 from '@/assets/seals/14.svg';
import seal15 from '@/assets/seals/15.svg';
import seal16 from '@/assets/seals/16.svg';
import seal17 from '@/assets/seals/17.svg';
import seal18 from '@/assets/seals/18.svg';
import seal19 from '@/assets/seals/19.svg';
import seal20 from '@/assets/seals/20.svg';

const sealImages: Record<number, string> = {
  1: seal1, 2: seal2, 3: seal3, 4: seal4, 5: seal5,
  6: seal6, 7: seal7, 8: seal8, 9: seal9, 10: seal10,
  11: seal11, 12: seal12, 13: seal13, 14: seal14, 15: seal15,
  16: seal16, 17: seal17, 18: seal18, 19: seal19, 20: seal20,
};

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
    <div className="p-4">
      <h2 className="text-base mb-3 text-black text-center">Matriz Tzolkin</h2>
      <div className="flex flex-row items-start justify-center w-full pt-2 mt-12 gap-3">
        {/* Column of seals on the left */}
        <div className="flex flex-col -mt-px">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(sealNumber => (
            <div 
              key={`seal-${sealNumber}`}
              className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 border border-black flex items-center justify-center -mt-px"
            >
              <img 
                src={sealImages[sealNumber]} 
                alt={`Selo ${sealNumber}`}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
          ))}
        </div>
        
        {/* Matrix grid */}
        <div className="flex flex-col">
          {renderMatrix()}
        </div>
      </div>
    </div>
  );
};

export default TzolkinMatrix;
