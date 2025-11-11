import MistLayer from "../layerComponents/visuals/MistLayer";

export default function ForestScene({ films, loading, onFilmSelect }) {
  if (loading) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-green-950">
        <MistLayer theme="forest" layers={3} baseOpacity={0.3} direction="diagonal" />
        <p className="text-green-200 text-xl animate-pulse">
          Cargando películas...
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/forest.png')" }}
    >
      {/* 🌫️ niebla del bosque */}
      <MistLayer theme="forest" layers={4} baseOpacity={0.35} direction="diagonal" />

      <div className="relative z-10 text-center pt-16 mb-8">
        <h1 className="text-4xl text-white font-light mb-2 drop-shadow-lg">
          Bosque con Calcifer
        </h1>
        <p className="text-green-200">Películas: {films.length}</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-6 pb-20">
        {films.map((film) => (
          <div
            key={film.id}
            onClick={() => onFilmSelect(film)}
            className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg"
          >
            {film.image && (
              <img
                src={film.image}
                alt={film.name}
                className="w-full h-64 object-cover"
              />
            )}
            <h3 className="text-center text-black text-sm font-semibold p-2">
              {film.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
