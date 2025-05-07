
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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-6 px-4 md:px-6 space-y-4">
        {/* Section 1: 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Column 1: Kin Info and Date Converter - moved to first column */}
          <div className="lg:col-span-3 space-y-4">
            <KinInfo kin={selectedKin} />
            <DateConverter onKinSelect={setSelectedKin} />
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
        
        {/* Section 2: 3-column layout */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column 1: Kin Description - moved from section 1 column 2 */}
          <div className="space-y-4">
            <KinDescription kin={selectedKin} />
          </div>
          
          {/* Column 2: Oracle Description - moved from section 1 column 3 */}
          <div className="space-y-4">
            <OracleDescription kin={selectedKin} />
          </div>
          
          {/* Column 3: Wave View and Wave Description - consolidated */}
          <div className="space-y-4">
            <OracleView
              kin={selectedKin}
              onKinSelect={setSelectedKin}
              view="wave"
              onViewChange={() => {}} // Disabled function since we'll remove the buttons
            />
            <WaveDescription kin={selectedKin} />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-primary/30 mt-8 py-4 text-center text-gray-400">
        <p>Tzolkin Oracle Explorer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
