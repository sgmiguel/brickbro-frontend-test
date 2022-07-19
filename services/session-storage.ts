



export function saveSearch(name: string, latitude: string, longitude: string) {
  const searches = sessionStorage.getItem('searches')
  const searchesObject = searches ? JSON.parse(searches) : []
  const searchObject = {
    name,
    latitude,
    longitude,
  } as Search

  searchesObject.push(searchObject)

  const stringified = JSON.stringify(searchesObject)
  sessionStorage.setItem('searches', stringified)
}

export function getLastSearch(): LastSearch {
  const searches = sessionStorage.getItem('searches')
  if (!searches) return {} as LastSearch

  const searchesObject = JSON.parse(searches)
  const { latitude, longitude } = searchesObject.at(-1)

  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  }
}

export function getPreviousSearches(): Search[] {
  const searches = sessionStorage.getItem('searches')
  if (!searches) return []

  return JSON.parse(searches)
}