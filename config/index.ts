const config = {
  lang: 'es',
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  autocomplete: {
    language: 'es',
    placeholder: 'Introduce una dirección...',
    noOptionsMessage: 'Sin resultados',
    loadingMessage: 'Buscando...',
  },
  theme: {
    baseColor: '#0063a6',
    baseColorHover: '#005893'
  },
  map: {
    DEFAULT_ZOOM: 12,
  }
}

export default config