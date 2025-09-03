import { useState } from "react";
import TzolkinMatrix from "@/components/TzolkinMatrix";
import KinInfo from "@/components/KinInfo";
import OracleView from "@/components/OracleView";
import DateConverter from "@/components/DateConverter";
import KinDescription from "@/components/KinDescription";
import OracleDescription from "@/components/OracleDescription";
import WaveDescription from "@/components/WaveDescription";

const Index = () => {
  const [selectedKin, setSelectedKin] = useState<number>(35); // default: Águia Solar Azul (Kin 35)

  return (
    <>
      {/* ====== CSS GLOBAL (scroll, matriz, responsivo) ====== */}
      <style jsx global>{`
        /* ===== Scroll: remove overflow interno e alturas travadas ===== */
        html, body, #__next, #root {
          height: auto !important;
          min-height: 100% !important;
          overflow: visible !important;
        }
        .app, .page, .container-principal {
          height: auto !important;
          min-height: 100% !important;
          overflow: visible !important;
        }

        /* ===== Matriz: nunca cortar a primeira linha e permitir scroll-x no mobile ===== */
        .secao-matriz .matriz-wrap {
          padding-top: 12px;           /* evita corte da 1ª linha */
          overflow-x: auto;            /* scroll horizontal quando precisar */
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
        }
        .secao-matriz .matriz-grid {
          overflow: visible;
        }

        /* ===== Esconder Matriz no mobile (pode reativar depois) ===== */
        @media (max-width: 768px) {
          .secao-matriz { display: none !important; }
        }

        /* ===== Tipografia de títulos (mantém hierarquia) ===== */
        .titulo-secao {
          font-weight: 700;
          font-size: 22px; /* mesmo tamanho para "Calculadora de Kin", "Oráculo Destino", "Matriz Tzolkin" */
          line-height: 1.2;
        }

        /* ===== Selo/Tom (ganchos genéricos – só funcionam se as classes existirem dentro dos componentes) ===== */
        .selo, .tom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .selo-shape, .tom-shape {
          width: 140px; height: 140px;
        }
        @media (max-width: 768px) {
          .selo-shape, .tom-shape { width: 112px; height: 112px; }
        }
        .selo-num, .tom-num {
          font-size: 44px;
          font-weight: 800;
          line-height: 1;
        }

        /* Contraste do número do selo quando o card tiver fundo claro (se houver essa classe) */
        .card--tint .selo-num { color: #111 !important; }
        .card--solid .selo-num { color: #fff !important; }

        /* Gambiarra de segurança caso não existam as classes acima: dá contorno leve no número */
        .selo-num.fallback-contrast {
          color: #fff;
          text-shadow: 0 0 2px rgba(0,0,0,.35), 0 0 1px rgba(0,0,0,.35);
        }
      `}</style>

      <div style={{ height: "auto", minHeight: "100%", overflow: "visible" }}>
        <main className="container mx-auto py-6 px-4 md:px-6 space-y-6 overflow-visible">
          {/* 3 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna 1: Calculadora + Kin */}
            <section className="lg:col-span-3 space-y-4">
              <h2 className="titulo-secao">Calculadora de Kin</h2>
              <DateConverter onKinSelect={setSelectedKin} />
              <KinInfo kin={selectedKin} />
            </section>

            {/* Coluna 2: Oráculo */}
            <section className="lg:col-span-4 space-y-4">
              <h2 className="titulo-secao">Oráculo Destino</h2>
              <OracleView
                kin={selectedKin}
                onKinSelect={setSelectedKin}
                view="oracle"
                onViewChange={() => {}}
              />
            </section>

            {/* Coluna 3: Matriz */}
            <section className="lg:col-span-5 space-y-3 secao-matriz">
              <h2 className="titulo-secao">Matriz Tzolkin</h2>
              <div className="matriz-wrap">
                <TzolkinMatrix
                  selectedKin={selectedKin}
                  onKinSelect={setSelectedKin}
                />
              </div>
            </section>
          </div>

          {/* Cartas/descrições escondidas (mantido) */}
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
        </main>
      </div>
    </>
  );
};

export default Index;

