
import React from 'react';
import { getKinComponents } from '@/lib/tzolkinData';

interface KinDescriptionProps {
  kin: number;
}

const KinDescription: React.FC<KinDescriptionProps> = ({ kin }) => {
  const { tone, seal } = getKinComponents(kin);
  
  // Generate a descriptive text based on the kin's components
  const generateDescription = () => {
    return (
      <div>
        <p className="mb-4">
          <span className="font-semibold">Kin {kin}:</span> {seal.name} {tone.name} representa 
          a energia de {seal.description} combinada com o tom {tone.name} ({tone.description}).
        </p>
        
        <p className="mb-4">
          O <span className="font-semibold">{seal.name}</span> traz a energia de {seal.description}. 
          Esta energia nos conecta com a qualidade {seal.color === 'red' ? 'vermelha de iniciação' : 
          seal.color === 'white' ? 'branca de refinamento' : 
          seal.color === 'blue' ? 'azul de transformação' : 
          'amarela de maturação'}.
        </p>
        
        <p className="mb-4">
          O Tom <span className="font-semibold">{tone.name} ({tone.number})</span> é a energia de {tone.description}. 
          Este tom galáctico nos ajuda a {
            tone.number <= 3 ? 'identificar e definir' : 
            tone.number <= 6 ? 'medir e organizar' : 
            tone.number <= 9 ? 'equilibrar e harmonizar' : 
            'refinar e manifestar'
          } nossos potenciais.
        </p>
        
        <p>
          Quando você vibra na frequência do Kin {kin}, você está alinhado com as energias cósmicas 
          que facilitam {tone.description.toLowerCase()} através da {seal.description.toLowerCase()}.
        </p>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="section-title">Significado do Kin</h2>
      <div className="text-black">
        {generateDescription()}
      </div>
    </div>
  );
};

export default KinDescription;
