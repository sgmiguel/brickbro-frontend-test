import styled from 'styled-components'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'
import getLatitudeAndLongitude from '../services/get-latitude-and-longitude'
import { saveSearch } from '../services/session-storage'

export default function SearchForm({ handleUpdate }: { handleUpdate?: () => void }) {
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