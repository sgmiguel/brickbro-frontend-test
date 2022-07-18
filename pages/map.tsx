import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchForm from '../components/SearchForm'
import Logo from '../components/Logo'

const DEFAULT_ZOOM = 11

const Map: NextPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })

  useEffect(() => handleUpdate(), [])

  const handleUpdate = () => {
    const latitude = sessionStorage.getItem('latitude')
    const longitude = sessionStorage.getItem('longitude')
    setCenter({
      lat: Number(latitude),
      lng: Number(longitude)
    })
  }

  return (
    <>
      <Head>
        <title>Map</title>
        <meta
          name="description"
          content="Geolocaliza cualquier dirección y visualízala en un mapa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Logo />
        <SearchForm handleUpdate={handleUpdate} />
        <ResultWrapper>
          <MapWrapper>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '' }}
              center={center}
              zoom={DEFAULT_ZOOM}
            />
          </MapWrapper>
          <PreviousSearches>
            <h2>Búsquedas</h2>

          </PreviousSearches>
        </ResultWrapper>
      </main>
    </>
  )
}

const MapWrapper = styled.div`
  display: flex;
  height: 800px;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const PreviousSearches = styled.div`
  display: flex;
`

export default Map