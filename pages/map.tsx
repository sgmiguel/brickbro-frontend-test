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

const DEFAULT_ZOOM = 12

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
        <SearchForm handleUpdate={handleUpdate} mapPage={true} />
        <ResultWrapper>
          <MapWrapper>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '' }}
              center={center}
              zoom={DEFAULT_ZOOM}
            />
          </MapWrapper>
          <PreviousSearches>
            <ContainerTitle>Búsquedas anteriores</ContainerTitle>
            <ContainerDescription>Encuentra las búsquedas que has realizado anteriormente en tu sesión actual</ContainerDescription>
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

const ContainerTitle = styled.h2`
  margin-bottom: 2px;
`

const ContainerDescription = styled.p`
  font-size: 18px;
`

const MarkerIcon = styled(FontAwesomeIcon)`
  width: 16px;
  margin-right: 3px;
  color: #0085DF;
`

const Main = styled.main`
  margin: 0px 15%;
  margin-top: 5rem;
`

const Searches = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 5px;
`

const Search = styled.div`
  display: flex;
  align-items: center;
`

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 800px;
  width: 100%;

  & > div > div {
    border-radius: 4px;
    box-shadow: 2px 2px 10px #d1d1d1;
  }
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`

const PreviousSearches = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 2rem;
`

export default Map