import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchForm from '../components/SearchForm'
import Logo from '../components/Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { getLastSearch, getPreviousSearches } from '../services/session-storage'

const DEFAULT_ZOOM = 11

const Map: NextPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [previousSearches, setPreviousSearches] = useState<Search[]>([])

  useEffect(() => handleUpdate(), [])

  const handleUpdate = () => {
    const { latitude, longitude } = getLastSearch()
    setCenter({
      lat: latitude,
      lng: longitude
    })

    const searches = getPreviousSearches()
    setPreviousSearches(searches)
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
      <Main>
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
            <h2>Búsquedas anteriores</h2>
            <p>Encuentra las búsquedas que has realizado anteriormente en tu sesión actual</p>
            <Searches>
              {
                previousSearches.map(search => (
                  <Search key={search.name}>
                    <MarkerIcon icon={faLocationDot} />
                    <span>{search.name}</span>
                  </Search>
                ))
              }
            </Searches>
          </PreviousSearches>
        </ResultWrapper>
      </Main>
    </>
  )
}

const MarkerIcon = styled(FontAwesomeIcon)`
  width: 16px;
`

const Main = styled.main`
  margin: 0px 15%;
`

const Searches = styled.div`
  display: flex;
`

const Search = styled.div`
  display: flex;
`

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 800px;
  width: 100%;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`

const PreviousSearches = styled.div`
  display: flex;
  flex-direction: column;
`

export default Map