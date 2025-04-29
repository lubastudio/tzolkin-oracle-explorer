
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
    <div className="min-h-screen bg-white">
      <header className="p-6 text-center border-b border-black/30">
        <h1 className="text-4xl font-bold text-black">
          Calculadora de Kin
        </h1>
        <p className="text-lg text-black mt-2">
          Navegue pelo oráculo galáctico inspirado no calendário Maia
        </p>
      </header>
      
      <main className="container mx-auto py-6 px-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TzolkinMatrix
            selectedKin={selectedKin}
            onKinSelect={setSelectedKin}
          />
          
          <div className="space-y-6">
            <DateConverter onKinSelect={setSelectedKin} />
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
