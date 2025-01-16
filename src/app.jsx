import { useWindowSize } from "@uidotdev/usehooks";
import { Loader } from "lucide-react";
import { useState } from "react";
import ReactConfetti from "react-confetti";

const RESULTS = [
  "No, no estas gorda no seas tonta",
  "No, tenes que comer más maldita enana flacucha",
  "No, tas igual de linda que siempre",
  "No, ahre re corto el mensaje perdón me quede sin ideas",
  "No no no no no no no no no no",
  "Nop",
];

function getRandomResult() {
  return RESULTS[Math.floor(Math.random() * RESULTS.length)];
}

export default function App() {
  const { width, height } = useWindowSize();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(getRandomResult());

  function handleAnalyze() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(true);
    }, 1000);
  }

  return (
    <main className="grid min-h-screen place-items-center">
      <section>
        <h1 className="relative flex text-6xl font-bold tracking-[-5px]">
          <span className="mb-12">
            <span className="text-pink-600">¿</span>Estoy
          </span>
          <span className="-ml-16 mt-12">
            Gorda<span className="text-pink-600">?</span>
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-56 text-center opacity-50">
          Los resultados son 100% reales y 100% chequeados.
        </p>
        <button
          disabled={isLoading}
          onClick={handleAnalyze}
          className="mt-3 flex w-full items-center justify-center rounded-md bg-pink-600 px-4 py-2.5 text-lg font-semibold text-white disabled:opacity-50"
        >
          {isLoading && <Loader className="mr-2 animate-spin" />}
          {isLoading ? "Analizando..." : "Analizar"}
        </button>
      </section>
      {isOpen && (
        <div className="absolute inset-0 grid place-items-center bg-white">
          <section className="relative z-30 rounded-md bg-white p-4">
            <h2 className="text-4xl font-bold leading-[1] tracking-tighter">
              Resultado:
            </h2>
            <p className="mt-2 opacity-50">{result}</p>
            <img
              src="/milky.jpeg"
              className="mt-4 max-h-[300px] w-full min-w-[225px] max-w-[400px] overflow-hidden rounded-md object-cover"
            />
            <button
              onClick={() => {
                setResult(getRandomResult());
                setIsOpen(false);
              }}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-pink-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
            >
              Cerrar
            </button>
          </section>
        </div>
      )}
      {isOpen && <ReactConfetti width={width} height={height} />}
    </main>
  );
}
