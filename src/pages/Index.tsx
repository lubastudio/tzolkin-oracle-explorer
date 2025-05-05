
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
      <main className="container mx-auto py-6 px-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <DateConverter onKinSelect={setSelectedKin} />
            <TzolkinMatrix
              selectedKin={selectedKin}
              onKinSelect={setSelectedKin}
            />
          </div>
          
          <div className="space-y-6 lg:col-span-1">
            <KinInfo kin={selectedKin} />
            <OracleView
              kin={selectedKin}
              onKinSelect={setSelectedKin}
              view={view}
              onViewChange={setView}
            />
          </div>
          
          <div className="space-y-6 lg:col-span-1 flex flex-col">
            <div className="min-h-fit">
              <KinDescription kin={selectedKin} />
            </div>
            <div className="min-h-fit">
              <OracleDescription kin={selectedKin} />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <WaveDescription kin={selectedKin} />
        </div>
      </main>
      
      <footer className="border-t border-primary/30 mt-10 py-4 text-center text-gray-400">
        <p>Tzolkin Oracle Explorer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
