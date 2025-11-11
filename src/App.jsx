import { useState } from 'react'
import useGhibliFilms from './hooks/useGhibliFilms'
import IntroScene from "./scenes/IntroScene";
import ForestScene from "./scenes/ForestScene";
import FilmDetailScene from "./scenes/FilmDetailScene";

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const { films, loading } = useGhibliFilms();

  if (step === 1) {
    return <IntroScene onNext={() => setStep(2)} />;
  }

  if (step === 2) {
    return (
      <ForestScene
        films={films}
        loading={loading}
        onFilmSelect={(film) => {
          setSelectedFilm(film);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3 && selectedFilm) {
    return (
      <FilmDetailScene
        film={selectedFilm}
        onBack={() => setStep(2)}
      />
    );
  }

    return null;
  }