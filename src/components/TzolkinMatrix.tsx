
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
    // Create matrix organized by columns (tones)
    const columns = [];
    
    // Each column represents one tone (1-13)
    for (let toneIndex = 0; toneIndex < 13; toneIndex++) {
      const cells = [];
      
      // Each column has 20 rows (one for each seal)
      for (let sealIndex = 0; sealIndex < 20; sealIndex++) {
        // Calculate the kin number: each column starts at (toneIndex * 20) + 1
        // and increments by seal index
        const kin = (toneIndex * 20) + sealIndex + 1;
        const isSelected = kin === selectedKin;
        
        cells.push(
          <div 
            key={`kin-${kin}`}
            className={`tzolkin-cell w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8 border border-black text-[8px] md:text-xs flex items-center justify-center ${getKinColorClass(kin)} ${
              isSelected ? 'ring-2 ring-black scale-110' : ''
            }`}
            onClick={() => onKinSelect(kin)}
          >
            {kin}
          </div>
        );
      }
      
      columns.push(
        <div key={`tone-col-${toneIndex+1}`} className="flex flex-col -ml-px">
          {cells}
        </div>
      );
    }
    
    return columns;
  };

  return (
    <div className="px-0 py-4 md:px-4">
      <h2 className="text-base mb-3 text-black text-center">Matriz Tzolkin</h2>
      <div className="flex flex-row items-start justify-center w-full gap-1">
        {/* Column of seals on the left */}
        <div className="flex flex-col">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(sealNumber => (
            <div 
              key={`seal-${sealNumber}`}
              className="w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center border-0"
            >
              <img 
                src={sealImages[sealNumber]} 
                alt={`Selo ${sealNumber}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* Matrix grid */}
        <div className="flex flex-row -ml-px">
          {renderMatrix()}
        </div>
      </div>
    </div>
  );
};

export default TzolkinMatrix;
