
import React from 'react';
import { getKinComponents, getKinColorClass } from '@/lib/tzolkinData';

interface KinInfoProps {
  kin: number;
}

const KinInfo: React.FC<KinInfoProps> = ({ kin }) => {
  const { tone, seal } = getKinComponents(kin);
  const colorClass = getKinColorClass(kin);
  
  // Função para formatar o nome do Kin corretamente: [Selo] + [Tom] + [Cor]
  const formatKinName = () => {
    // Extrai apenas o nome base do selo (sem a cor)
    const baseSealName = seal.name.split(' ')[0];
    
    // Cor em português
    const colorTranslation: Record<string, string> = {
      'red': 'Vermelho',
      'white': 'Branco',
      'blue': 'Azul',
      'yellow': 'Amarelo'
    };
    
    return `${baseSealName} ${tone.name} ${colorTranslation[seal.color]}`;
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center">
          <span className="font-medium text-black mb-1">Selo</span>
          <div className={`w-24 h-24 ${colorClass} rounded-lg flex items-center justify-center mb-2 cursor-pointer hover:scale-105 transition`}>
            <span className="text-2xl font-bold">{seal.name.split(" ")[0]}</span>
          </div>
          <p className="font-semibold">{seal.name}</p>
          <p className="text-sm text-black">{seal.description}</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2">Kin {kin}</h3>
          <h3 className="text-2xl">{formatKinName()}</h3>
          <p className="text-sm text-black mt-2">
            {seal.description} • {tone.description}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="font-medium text-black mb-1">Tom</span>
          <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-2 bg-white border-2 border-black cursor-pointer hover:scale-105 transition">
            <span className="text-3xl font-bold text-black">{tone.number}</span>
          </div>
          <p className="font-semibold">{tone.name}</p>
          <p className="text-sm text-black">{tone.description}</p>
        </div>
      </div>
    </div>
  );
};

export default KinInfo;
