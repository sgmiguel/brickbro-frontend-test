type Option = {
  label: string,
  value: google.maps.places.AutocompletePrediction
}

interface Search {
  name: string,
  latitude: string,
  longitude: string
}

interface LastSearch {
  latitude: number,
  longitude: number
}