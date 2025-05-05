
import React from 'react';
import { getKinComponents, calculateWave } from '@/lib/tzolkinData';

interface WaveDescriptionProps {
  kin: number;
}

const WaveDescription: React.FC<WaveDescriptionProps> = ({ kin }) => {
  const wave = calculateWave(kin);
  const waveStartKin = wave[0]; // First kin in the wave
  const { seal: waveSeal } = getKinComponents(waveStartKin);
  
  const getWaveDescription = () => {
    const waveName = `Onda Encantada do ${waveSeal.name} ${waveSeal.color === 'red' ? 'Vermelho' : 
                                                    waveSeal.color === 'white' ? 'Branco' : 
                                                    waveSeal.color === 'blue' ? 'Azul' : 
                                                    'Amarelo'}`;
    
    const waveDescriptions: Record<string, string> = {
      'Dragão': 'Nutrir, Ser, Nascimento - A Onda do Dragão nos ensina sobre nutrição, afeto e as fundações do ser.',
      'Mago': 'Encantar, Atemporalidade, Receptividade - A Onda do Mago nos conecta com a magia da receptividade e o encantamento.',
      'Mão': 'Conhecer, Cura, Realização - A Onda da Mão nos guia pelo caminho da cura e do conhecimento que realiza.',
      'Sol': 'Iluminar, Fogo Universal, Vida - A Onda do Sol traz a iluminação e a energia vital que sustenta tudo.',
      'Caminhante do Céu': 'Explorar, Espaço, Vigilância - A Onda do Caminhante do Céu nos convida à exploração do desconhecido.',
      'Enlaçador de Mundos': 'Igualar, Morte, Oportunidade - A Onda do Enlaçador de Mundos nos ensina sobre transformação e igualdade.',
      'Tormenta': 'Energizar, Auto-geração, Catalização - A Onda da Tormenta traz energia catalítica e auto-renovação.',
      'Humano': 'Influenciar, Livre Arbítrio, Sabedoria - A Onda do Humano nos conecta com nossa sabedoria e capacidade de escolha.',
      'Serpente': 'Sobreviver, Força Vital, Instinto - A Onda da Serpente desperta nossos instintos e força vital primordial.',
      'Espelho': 'Refletir, Ordem, Infinito - A Onda do Espelho nos convida à reflexão e percepção da ordem cósmica.',
      'Macaco': 'Jogar, Magia, Ilusão - A Onda do Macaco traz a energia lúdica e a magia da criatividade.',
      'Semente': 'Atentar, Consciência, Florescimento - A Onda da Semente nos guia ao florescimento da consciência.',
      'Terra': 'Evoluir, Navegação, Sincronia - A Onda da Terra nos conecta com os ritmos evolutivos e a sincronia.',
      'Cachorro': 'Amar, Coração, Lealdade - A Onda do Cachorro desperta o amor incondicional e a lealdade.',
      'Noite': 'Abundar, Sonho, Intuição - A Onda da Noite nos conecta com a abundância dos sonhos e intuição.',
      'Guerreiro': 'Questionar, Inteligência, Destemor - A Onda do Guerreiro nos desafia a questionar com coragem.',
      'Lua': 'Purificar, Fluxo, Água Universal - A Onda da Lua nos guia no fluxo de purificação emocional.',
      'Vento': 'Comunicar, Espírito, Respiração - A Onda do Vento nos conecta através da comunicação espiritual.',
      'Águia': 'Criar, Mente, Visão - A Onda da Águia desperta nossa visão criativa e perspectiva expandida.',
      'Estrela': 'Embelezar, Arte, Elegância - A Onda da Estrela nos inspira a encontrar beleza e harmonia.'
    };
    
    const wavePowers = [
      "1º dia: Poder de Propositar - Identificar seu propósito",
      "2º dia: Poder de Desafiar - Identificar os obstáculos",
      "3º dia: Poder de Servir - Encontrar formas de servir",
      "4º dia: Poder de Definir - Definir sua estrutura",
      "5º dia: Poder de Comandar - Dar ordens claras",
      "6º dia: Poder de Equilibrar - Harmonizar as polaridades",
      "7º dia: Poder de Canalizar - Inspirar-se em fontes superiores",
      "8º dia: Poder de Harmonizar - Criar modelos de integridade",
      "9º dia: Poder de Realizar - Manifestar intenções",
      "10º dia: Poder de Manifestar - Expressar perfeição",
      "11º dia: Poder de Dissolver - Liberar o que não serve",
      "12º dia: Poder de Dedicar - Universalizar sua experiência",
      "13º dia: Poder de Transcender - Alcançar a transformação"
    ];
    
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">{waveName}</h3>
        <p className="mb-4">{waveDescriptions[waveSeal.name] || `A Onda do ${waveSeal.name} traz qualidades específicas relacionadas à sua energia.`}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wavePowers.map((power, index) => (
            <div key={index} className={`p-2 rounded-md ${wave[index] === kin ? 'bg-gray-200 font-bold' : ''}`}>
              {power}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="section-title">Significado da Onda Encantada</h2>
      <div className="text-black">
        {getWaveDescription()}
      </div>
    </div>
  );
};

export default WaveDescription;
