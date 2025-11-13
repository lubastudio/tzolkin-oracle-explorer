
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
    <div className="app-shell">
      <div className="app-layout">
        {/* Sidebar: Date Converter and Kin Info */}
        <div className="app-sidebar space-y-2">
          <DateConverter onKinSelect={setSelectedKin} />
          <KinInfo kin={selectedKin} />
        </div>
        
        {/* Main content: Oracle and Matrix */}
        <div className="app-main space-y-2">
          <OracleView
            kin={selectedKin}
            onKinSelect={setSelectedKin}
            view="oracle"
            onViewChange={() => {}}
          />
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
    </div>
  );
};

export default Index;
