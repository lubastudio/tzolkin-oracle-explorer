
import { useState } from 'react';
import TzolkinMatrix from '@/components/TzolkinMatrix';
import KinInfo from '@/components/KinInfo';
import OracleView from '@/components/OracleView';
import DateConverter from '@/components/DateConverter';
import KinDescription from '@/components/KinDescription';

const Index = () => {
  const [selectedKin, setSelectedKin] = useState<number>(35); // Default to Águia Solar Azul (Kin 35)
  const [view, setView] = useState<'oracle' | 'wave'>('oracle');

  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <header className="p-6 text-center border-b border-primary/30">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-pulse-soft">
          Tzolkin Oracle Explorer
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          Explore a matriz Tzolkin, descubra seu Kin e navegue pelo oráculo galáctico
        </p>
      </header>
      
      <main className="container mx-auto py-6 px-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TzolkinMatrix
            selectedKin={selectedKin}
            onKinSelect={setSelectedKin}
          />
          
          <div className="space-y-6">
            <KinInfo kin={selectedKin} />
            <OracleView
              kin={selectedKin}
              onKinSelect={setSelectedKin}
              view={view}
              onViewChange={setView}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DateConverter onKinSelect={setSelectedKin} />
          <KinDescription kin={selectedKin} />
        </div>
      </main>
      
      <footer className="border-t border-primary/30 mt-10 py-4 text-center text-gray-400">
        <p>Tzolkin Oracle Explorer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
