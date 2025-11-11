import MistLayer from "../layerComponents/visuals/MistLayer";

export default function FilmDetailScene({ film, onBack }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-orange-900 to-slate-900 overflow-hidden text-white">
      {/* 🌫️ niebla cálida */}
      <MistLayer theme="calcifer" layers={3} baseOpacity={0.25} direction="x" />

      <div className="relative z-10 p-8">
        <button
          onClick={onBack}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded mb-8"
        >
          ← Volver al bosque
        </button>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {film.image && (
            <img
              src={film.image}
              alt={film.name}
              className="rounded shadow-lg"
            />
          )}

          <div>
            <h1 className="text-4xl font-bold mb-2">{film.name}</h1>
            <p className="text-amber-400 mb-4">Director: {film.director}</p>
            <p className="text-slate-200 leading-relaxed">{film.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
