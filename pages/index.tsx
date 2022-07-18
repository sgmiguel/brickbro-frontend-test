import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import styled from 'styled-components'
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'
import { useState } from "react"

type Option = {
  label: string,
  value: google.maps.places.AutocompletePrediction
}

const Home: NextPage = () => {
  const router = useRouter()
  const [addressName, setAddressName] = useState<string>('')
  const [addressId, setAddressId] = useState<string>('')

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    const geocodeResult = await geocodeByPlaceId(addressId)
    const latituedAndLongitude = await getLatLng(geocodeResult[0])
    sessionStorage.setItem('latitude', String(latituedAndLongitude.lat))
    sessionStorage.setItem('longitude', String(latituedAndLongitude.lng))
    router.push('/map')
  }

  const onChange = (option: Option) => {
    setAddressId(option.value.place_id)
    setAddressName(option.value.description)
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Geolocaliza cualquier dirección y visualízala en un mapa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Logo src="/logo.png" alt="Brickbro logo" width={450} height={116}></Logo>
        <SearchForm onSubmit={handleSubmit}>
          <SearchWrapper>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              selectProps={{ onChange }}
            />
          </SearchWrapper>
          <SearchButton>Search</SearchButton>
        </SearchForm>
      </Main>
    </>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Logo = styled(Image)`
  width: 80px;
  height: 100px;
`

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const SearchButton = styled.button`
  cursor: pointer;
  background: #0063a6;
  color: white;
  height: 32px;
  width: 100px;
  border-radius: 4px;
  border: none;
`

const SearchWrapper = styled.div`
  width: 400px;
`

export default Home