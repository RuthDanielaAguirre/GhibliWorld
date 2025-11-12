import { useEffect, useState } from 'react'

function normalizeFilm(raw) {
  // 🔍 AGREGA ESTO para ver qué viene realmente:
  console.log('Datos RAW de la API:', raw)
  
  return {
    id: raw.id,
    title: raw.title || 'Sin título',
    image: raw.image || raw.movie_banner || '',
    description: raw.description || 'Sin descripción disponible',
    director: raw.director || 'Desconocido',
    releaseDate: raw.release_date || '',
    rtScore: raw.rt_score || '0'
  }
}

export default function useGhibliFilms() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const CACHE_KEY = 'ghibli_films_cache'
  const CACHE_TIME_KEY = 'ghibli_films_time'
  const CACHE_DURATION = 1000 * 60 * 60

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY)
    
    if (cached && cacheTime) {
      const age = Date.now() - parseInt(cacheTime)
      
      if (age < CACHE_DURATION) {
        try {
          const parsed = JSON.parse(cached)
          setFilms(parsed)
          setLoading(false)
          console.log('📦 Datos cargados desde caché')
          return
        } catch {
          localStorage.removeItem(CACHE_KEY)
          localStorage.removeItem(CACHE_TIME_KEY)
        }
      }
    }

    console.log('🌐 Fetching desde API de Ghibli...')
    
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        console.log('Datos completos de la API:', data) 
        const normalized = data.map(normalizeFilm)
        setFilms(normalized)
        
        localStorage.setItem(CACHE_KEY, JSON.stringify(normalized))
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
        
        console.log(`✅ ${normalized.length} películas cargadas`)
      })
      .catch(err => {
        console.error('❌ Error fetching:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { films, loading, error }
}