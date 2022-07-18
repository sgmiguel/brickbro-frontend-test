import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GoogleMapReact from 'google-map-react'
import { useEffect, useState } from 'react'

const Map: NextPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    const latitude = sessionStorage.getItem('latitude')
    const longitude = sessionStorage.getItem('longitude')
    setCenter({
      lat: Number(latitude),
      lng: Number(longitude)
    })
  }, [])

  const defaultProps = {
    center: {
      lat: 41.38719627711809,
      lng: 2.1638462003099423
    },
    zoom: 11
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
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '' }}
            defaultCenter={center}
            defaultZoom={defaultProps.zoom}
          >
          </GoogleMapReact>
        </div>
      </main>
    </>
  )
}

export default Map