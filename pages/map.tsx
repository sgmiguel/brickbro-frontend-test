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
import Router from 'next/router'
import config from '../config'

const Map: NextPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [previousSearches, setPreviousSearches] = useState<Search[]>([])
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker>()
  const [canRender, setCanRender] = useState(false)

  useEffect(() => handleUpdate(), [])

  const handleUpdate = () => {
    const { latitude, longitude } = getLastSearch()
    if (!latitude || !longitude) return void Router.replace('/')
    setCanRender(true)

    setCenter({
      lat: latitude,
      lng: longitude
    })

    const searches = getPreviousSearches()
    setPreviousSearches(searches)

    if (!currentMarker) return
    currentMarker.setPosition({
      lat: latitude,
      lng: longitude
    })
  }

  const renderMarkers = (map: google.maps.Map, maps: typeof google.maps) => {
    const { latitude, longitude } = getLastSearch()
    if (!latitude || !longitude) return

    const marker = new maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      map
    })
    setCurrentMarker(marker)
    return marker
  }

  if (!canRender) return (<></>)

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
              bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
              center={center}
              zoom={config.map.DEFAULT_ZOOM}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            />
          </MapWrapper>
          <PreviousSearches>
            <ContainerTitle>Búsquedas anteriores</ContainerTitle>
            <ContainerDescription>Encuentra las búsquedas que has realizado anteriormente en tu sesión actual</ContainerDescription>
            <Searches>
              {
                previousSearches.map((search, index) => (
                  <Search key={index}>
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
  color: ${props => props.theme.baseColor};
`

const Main = styled.main`
  margin: 5rem 15%;

  @media (max-width: 1250px) {
    margin: 2rem 5%;
  }
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
  height: 600px;
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
`

const PreviousSearches = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 2rem;
`

export default Map