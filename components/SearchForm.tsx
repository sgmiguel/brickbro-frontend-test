import styled, { css } from 'styled-components'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'
import getLatitudeAndLongitude from '../services/get-latitude-and-longitude'
import { saveSearch } from '../services/session-storage'

export default function SearchForm({ handleUpdate, mapPage }: { handleUpdate?: () => void, mapPage?: boolean }) {
  const [addressName, setAddressName] = useState<string>('')
  const [addressId, setAddressId] = useState<string>('')

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    const { latitude, longitude } = await getLatitudeAndLongitude(addressId)
    saveSearch(addressName, latitude, longitude)
    if (handleUpdate) handleUpdate()
  }

  const onChange = (option: Option) => {
    setAddressId(option.value.place_id)
    setAddressName(option.value.description)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SearchWrapper mapPage={!!mapPage}>
        <SearchInput onChange={onChange}></SearchInput>
      </SearchWrapper>
      <SearchButton mapPage={!!mapPage}>Buscar</SearchButton>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
  width: 100%;
`

const SearchButton = styled.button<{mapPage: boolean, baseColor?: string, baseColorHover?: string}>`
  cursor: pointer;
  background: ${props => props.theme.baseColor};
  color: white;
  height: 37px;
  width: ${props => props.mapPage ? '150' : '100'}px;
  border-radius: 4px;
  border: none;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.baseColorHover};
  }

  ${props => !props.mapPage && css`
    @media (max-width: 550px) {
      width: 150px;
    }
  `}
`

const SearchWrapper = styled.div<{mapPage: boolean}>`
  width: ${props => props.mapPage ? '100%' : '400px'};
`