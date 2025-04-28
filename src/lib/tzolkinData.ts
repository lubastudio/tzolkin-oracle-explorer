
// 20 Solar Seals in order
export const solarSeals = [
  { name: "Dragão Vermelho", color: "red", description: "Nutrir, Nascimento" },
  { name: "Vento Branco", color: "white", description: "Espírito, Respiração" },
  { name: "Noite Azul", color: "blue", description: "Sonho, Abundância" },
  { name: "Semente Amarela", color: "yellow", description: "Atenção, Florescimento" },
  { name: "Serpente Vermelha", color: "red", description: "Sobrevivência, Instinto" },
  { name: "Enlaçador de Mundos Branco", color: "white", description: "Morte, Oportunidade" },
  { name: "Mão Azul", color: "blue", description: "Realização, Cura" },
  { name: "Estrela Amarela", color: "yellow", description: "Elegância, Arte" },
  { name: "Lua Vermelha", color: "red", description: "Purificação, Fluxo" },
  { name: "Cachorro Branco", color: "white", description: "Coração, Lealdade" },
  { name: "Macaco Azul", color: "blue", description: "Magia, Ilusão" },
  { name: "Humano Amarelo", color: "yellow", description: "Influência, Livre Arbítrio" },
  { name: "Caminhante do Céu Vermelho", color: "red", description: "Espaço, Exploração" },
  { name: "Mago Branco", color: "white", description: "Atemporalidade, Receptividade" },
  { name: "Águia Azul", color: "blue", description: "Visão, Mente" },
  { name: "Guerreiro Amarelo", color: "yellow", description: "Inteligência, Questionamento" },
  { name: "Terra Vermelha", color: "red", description: "Navegação, Sincronização" },
  { name: "Espelho Branco", color: "white", description: "Ordem, Sem Fim" },
  { name: "Tormenta Azul", color: "blue", description: "Energia, Auto Geração" },
  { name: "Sol Amarelo", color: "yellow", description: "Iluminação, Fogo Universal" },
];

// 13 Galactic Tones
export const galacticTones = [
  { name: "Magnético", number: 1, description: "Propósito" },
  { name: "Lunar", number: 2, description: "Desafio" },
  { name: "Elétrico", number: 3, description: "Serviço" },
  { name: "Auto-Existente", number: 4, description: "Forma" },
  { name: "Radial", number: 5, description: "Comando" },
  { name: "Rítmico", number: 6, description: "Equilíbrio" },
  { name: "Ressonante", number: 7, description: "Sintonia" },
  { name: "Galáctico", number: 8, description: "Integridade" },
  { name: "Solar", number: 9, description: "Intenção" },
  { name: "Planetário", number: 10, description: "Manifestação" },
  { name: "Espectral", number: 11, description: "Liberação" },
  { name: "Cristal", number: 12, description: "Cooperação" },
  { name: "Cósmico", number: 13, description: "Presença" },
];

// Months table data
export const months = [
  { name: "Janeiro", value: 0 },
  { name: "Fevereiro", value: 31 },
  { name: "Março", value: 59 },
  { name: "Abril", value: 90 },
  { name: "Maio", value: 120 },
  { name: "Junho", value: 151 },
  { name: "Julho", value: 181 },
  { name: "Agosto", value: 212 },
  { name: "Setembro", value: 243 },
  { name: "Outubro", value: 13 },
  { name: "Novembro", value: 44 },
  { name: "Dezembro", value: 74 },
];

// Years table data (simplified)
export const yearValues = {
  "2000": 152, "2001": 257, "2002": 102, "2003": 207, "2004": 52, 
  "2005": 157, "2006": 2, "2007": 107, "2008": 212, "2009": 57, 
  "2010": 162, "2011": 7, "2012": 112, "2013": 217, "2014": 62, 
  "2015": 167, "2016": 12, "2017": 117, "2018": 222, "2019": 67,
  "2020": 172, "2021": 17, "2022": 122, "2023": 227, "2024": 72,
  "2025": 177
};

// Helper functions for Tzolkin calculations
export const calculateKin = (year: string, month: number, day: number): number => {
  const yearValue = yearValues[year as keyof typeof yearValues] || 0;
  const monthValue = months[month]?.value || 0;
  
  let sum = yearValue + monthValue + day;
  
  // If sum is greater than 260, subtract 260 until it's in range 1-260
  while (sum > 260) {
    sum -= 260;
  }
  
  return sum;
};

export const getKinComponents = (kin: number): {
  tone: typeof galacticTones[number],
  seal: typeof solarSeals[number]
} => {
  // Ensure kin is between 1-260
  const normalizedKin = ((kin - 1) % 260) + 1;
  
  // Calculate tone (1-13)
  const toneIndex = (normalizedKin - 1) % 13;
  
  // Calculate seal (0-19)
  const sealIndex = (normalizedKin - 1) % 20;
  
  return {
    tone: galacticTones[toneIndex],
    seal: solarSeals[sealIndex]
  };
};

export const calculateOracle = (kin: number) => {
  const { tone, seal } = getKinComponents(kin);
  const sealIndex = solarSeals.findIndex(s => s.name === seal.name);
  
  // Calculate guide (same tone, add 19 to seal)
  const guideKin = ((sealIndex + 19) % 20) + 1 + (tone.number - 1) * 20;
  
  // Calculate analog (add 5 to seal, same tone)
  const analogKin = ((sealIndex + 5) % 20) + 1 + (tone.number - 1) * 20;
  
  // Calculate antipode (opposite tone 14-tone, add 10 to seal)
  const antipodeTone = 14 - tone.number;
  const antipodeKin = ((sealIndex + 10) % 20) + 1 + (antipodeTone - 1) * 20;
  
  // Calculate hidden (add 11 to seal, opposite tone)
  const hiddenKin = ((sealIndex + 11) % 20) + 1 + (antipodeTone - 1) * 20;
  
  return {
    guide: guideKin > 0 ? guideKin : guideKin + 260,
    analog: analogKin > 0 ? analogKin : analogKin + 260,
    antipode: antipodeKin > 0 ? antipodeKin : antipodeKin + 260,
    hidden: hiddenKin > 0 ? hiddenKin : hiddenKin + 260
  };
};

// Get color class for a kin
export const getKinColorClass = (kin: number): string => {
  const { seal } = getKinComponents(kin);
  
  switch (seal.color) {
    case 'red':
      return 'bg-tzolkin-red text-white';
    case 'white':
      return 'bg-tzolkin-white text-black';
    case 'blue':
      return 'bg-tzolkin-blue text-white';
    case 'yellow':
      return 'bg-tzolkin-yellow text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};
