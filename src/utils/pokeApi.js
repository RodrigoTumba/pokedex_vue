import axios from 'axios'

const API_BASE = 'https://pokeapi.co/api/v2'

// lista de Pokemon con paginación
export async function getPokemonList(limit = 20, offset = 0) {
  try {
    const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`)
    return response.data.results // devuelve nombre y url
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    return []
  }
}

// detalles de un Pokemon por ID o nombre
export async function getPokemonById(id) {
  try {
    const response = await axios.get(`${API_BASE}/pokemon/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error)
    return null
  }
}

//lista de Pokemon por tipo
export async function getPokemonsByType(typeName) {
  const res = await fetch(`${API_BASE}/type/${typeName}`)
  if (!res.ok) throw new Error('Error fetching Pokémon by type')
  const data = await res.json()
  return data.pokemon.map(p => p.pokemon)
}