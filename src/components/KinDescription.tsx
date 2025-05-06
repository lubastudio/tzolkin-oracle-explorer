
import React from 'react';
import { getKinComponents } from '@/lib/tzolkinData';

interface KinDescriptionProps {
  kin: number;
}

const KinDescription: React.FC<KinDescriptionProps> = ({ kin }) => {
  const { tone, seal } = getKinComponents(kin);
  
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
  
  // Generate a descriptive text based on the kin's components
  const generateDescription = () => {
    const kinName = formatKinName();
    
    return (
      <div>
        <p className="mb-3">
          <span className="font-semibold">Kin {kin}:</span> {kinName} representa 
          a energia de {seal.description} combinada com o tom {tone.name}.
        </p>
        
        <p className="mb-3">
          O <span className="font-semibold">{seal.name}</span> traz a energia de {seal.description}. 
          Esta energia nos conecta com a qualidade {seal.color === 'red' ? 'vermelha de iniciação' : 
          seal.color === 'white' ? 'branca de refinamento' : 
          seal.color === 'blue' ? 'azul de transformação' : 
          'amarela de maturação'}.
        </p>
        
        <p>
          O Tom <span className="font-semibold">{tone.name} ({tone.number})</span> representa {tone.description}.
        </p>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg h-auto">
      <h2 className="section-title">Significado do Kin</h2>
      <div className="text-black text-sm">
        {generateDescription()}
      </div>
    </div>
  );
};

export default KinDescription;
