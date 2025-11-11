import { useEffect, useState } from 'react'

function normalizeFilm(raw) {
  return {
    id: raw.id,
    name: raw.title ?? 'Untitled',
    image: raw.image ?? raw.movie_banner ?? '',
    description: raw.description ?? 'Sin descripción',
    director: raw.director ?? '',
    releaseDate: raw.release_date ?? ''
  }
}

export default function useGhibliFilms() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const CACHE_KEY = 'ghibli_films_cache'

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setFilms(parsed)
        setLoading(false)
        return
      } catch {
        localStorage.removeItem(CACHE_KEY)
      }
    }

    fetch('https://ghibliapi.vercel.app/films')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(data => {
        const normalized = data.map(normalizeFilm)
        setFilms(normalized)
        localStorage.setItem(CACHE_KEY, JSON.stringify(normalized))
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { films, loading, error }
}