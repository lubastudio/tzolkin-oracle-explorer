
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
      <main className="container mx-auto py-6 px-4 md:px-6">
        {/* Responsive flex layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar: Date Converter and Kin Info */}
          <div className="w-full md:w-[72px] lg:w-[120px] flex-shrink-0 space-y-4">
            <DateConverter onKinSelect={setSelectedKin} />
            <KinInfo kin={selectedKin} />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Oracle View */}
            <div className="space-y-4">
              <OracleView
                kin={selectedKin}
                onKinSelect={setSelectedKin}
                view="oracle"
                onViewChange={() => {}} // Disabled function since we'll remove the buttons
              />
            </div>
            
            {/* Tzolkin Matrix */}
            <div className="space-y-4">
              <TzolkinMatrix
                selectedKin={selectedKin}
                onKinSelect={setSelectedKin}
              />
            </div>
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
