import { Input } from "./components/inputs";
import "./App.css";
import { useState } from "react";
import { dadosIMC } from "./hooks/dadosTable";

interface DadosIMC {
  id: number;
  categoria: string;
  imc?: string | null;
  limites?: number | undefined;
}

function App() {
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [imc, setImc] = useState<number | null>(null);
  const [isborder, setIsBorder] = useState<string | undefined>("");
  const [limite, setLimite] = useState<DadosIMC[]>(dadosIMC);

  const handlePeso = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeso(parseFloat(e.target.value));
    setImc(null);
  };
  const handleAltura = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltura(parseFloat(e.target.value));
    setImc(null);
  };
  const calcularImc = () => {
    if (altura === 0) return 0;
    return peso / Math.pow(altura, 2);
  };

  const handleBorder = (value: number) => {
    const findDados = limite.find((item) => {
      if (item.limites === undefined) return;
      if (item.limites === 0) return Infinity;
      return value <= item.limites;
    });
    setIsBorder(findDados?.categoria);
  };

  const handleImc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imcValue = calcularImc();
    setImc(imcValue);
    setLimite((prev: DadosIMC[]) => {
      return prev.map((item) => {
        if (item.imc) {
          const value = Object.values(item.imc)
            .filter((value) => !isNaN(Number(value)) && value !== "")
            .slice(-4)
            .map(Number);

          const limites = value.reduce((acc, curr) => acc * 10 + curr, 0) / 10;

          return { ...item, limites };
        } else {
          return { ...item, limites: Infinity };
        }
      });
    });
    handleBorder(imcValue);
  };
  return (
    <div className="min-h-screen flex items-center p-[5.6vw] flex-col gap-4 bg-neutral-300">
      <div className="p-6 flex flex-col items-center max-w-md w-full bg-zinc-400 rounded-lg">
        <header>
          <h1 className="text-3xl font-bold mb-4">Calculadora IMC</h1>
        </header>
        <form className="max-w-200px" onSubmit={handleImc}>
          <div className="flex items-center justify-center">
            <Input
              placeholder="Ex: 70kg"
              type="text"
              id="peso"
              label="Peso:"
              onChange={handlePeso}
              mask="999"
            />
            <Input
              placeholder="Ex: 1.80m"
              type="text"
              id="altura"
              label="Altura:"
              onChange={handleAltura}
              mask="9.99"
            />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded
             hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:ring-opacity-50 w-full text-center"
            type="submit"
          >
            Verificar
          </button>
        </form>
      </div>
      {imc !== null && (
        <div className="mt-4 text-2xl font-bold flex flex-col items-center gap-2">
          Seu IMC é de {imc.toFixed(2)}
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Categoria</th>
                <th className="border px-4 py-2">IMC (kg/m²)</th>
              </tr>
            </thead>
            <tbody>
              {dadosIMC.map(({ id, categoria, imc }) =>
                isborder === categoria ? (
                  <tr key={id} className="border bg-zinc-400">
                    <td className="border px-4 py-2">{categoria}</td>
                    <td className="border px-4 py-2">{imc}</td>
                  </tr>
                ) : (
                  <tr key={id} className="border border-transparent">
                    <td className="border px-4 py-2">{categoria}</td>
                    <td className="border px-4 py-2">{imc}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
