import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'

export default async function getLatitudeAndLongitude(addressId: string) {
  const geocodeResult = await geocodeByPlaceId(addressId)
  const latitudeAndLongitude = await getLatLng(geocodeResult[0])
  const latitude = String(latitudeAndLongitude.lat)
  const longitude = String(latitudeAndLongitude.lng)

  return {
    latitude,
    longitude
  }
}