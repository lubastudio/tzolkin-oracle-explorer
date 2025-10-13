
import { useState } from 'react';
import TzolkinMatrix from '@/components/TzolkinMatrix';
import KinInfo from '@/components/KinInfo';
import OracleView from '@/components/OracleView';
import DateConverter from '@/components/DateConverter';
import KinDescription from '@/components/KinDescription';
import OracleDescription from '@/components/OracleDescription';
import WaveDescription from '@/components/WaveDescription';

const Index = () => {
  const [selectedKin, setSelectedKin] = useState<number>(35); // Default to Águia Solar Azul (Kin 35)
  const [view, setView] = useState<'oracle' | 'wave'>('oracle');

  return (
    <div>
      <main className="container mx-auto py-6 px-4 md:px-6 space-y-4">
        {/* Section 1: 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Date Converter and Kin Info - calculator above kin */}
          <div className="lg:col-span-3 space-y-4">
            <DateConverter onKinSelect={setSelectedKin} />
            <KinInfo kin={selectedKin} />
          </div>
          
          {/* Column 2: Oracle View - moved from column 3 */}
          <div className="lg:col-span-4 space-y-4">
            <OracleView
              kin={selectedKin}
              onKinSelect={setSelectedKin}
              view="oracle"
              onViewChange={() => {}} // Disabled function since we'll remove the buttons
            />
          </div>
          
          {/* Column 3: Tzolkin Matrix - moved from column 1 */}
          <div className="lg:col-span-5 space-y-4">
            <TzolkinMatrix
              selectedKin={selectedKin}
              onKinSelect={setSelectedKin}
            />
          </div>
        </div>
        
        {/* Hidden cards - as requested */}
        <div className="hidden">
          <KinDescription kin={selectedKin} />
          <OracleDescription kin={selectedKin} />
          <OracleView
            kin={selectedKin}
            onKinSelect={setSelectedKin}
            view="wave"
            onViewChange={() => {}}
          />
          <WaveDescription kin={selectedKin} />
        </div>
      </main>
    </div>
  );
};

export default Index;
