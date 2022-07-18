import styled from 'styled-components'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'

export default function SearchForm({ handleUpdate }: { handleUpdate?: () => void }) {
  const [addressName, setAddressName] = useState<string>('')
  const [addressId, setAddressId] = useState<string>('')

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    const geocodeResult = await geocodeByPlaceId(addressId)
    const latituedAndLongitude = await getLatLng(geocodeResult[0])
    sessionStorage.setItem('latitude', String(latituedAndLongitude.lat))
    sessionStorage.setItem('longitude', String(latituedAndLongitude.lng))
    if (handleUpdate) handleUpdate()
  }

  const onChange = (option: Option) => {
    setAddressId(option.value.place_id)
    setAddressName(option.value.description)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchInput onChange={onChange}></SearchInput>
      </SearchWrapper>
      <SearchButton>Search</SearchButton>
    </Form>
  )
}

const Form = styled.form`
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