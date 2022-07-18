import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Logo from '../components/Logo'
import SearchForm from '../components/SearchForm'

const Home: NextPage = () => {
  const router = useRouter()
  const handleUpdate = () => router.push('/map')

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
        <Logo />
        <SearchForm handleUpdate={handleUpdate} />
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

export default Home