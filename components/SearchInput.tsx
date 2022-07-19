import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import config from '../config'

export default function SearchInput({ onChange }: { onChange: (option: Option) => void }) {
  return (
    <GooglePlacesAutocomplete
      apiKey={config.GOOGLE_MAPS_API_KEY}
      apiOptions={{
        language: config.autocomplete.language,
      }}
      selectProps={{
        onChange,
        placeholder: config.autocomplete.placeholder,
        noOptionsMessage: () => config.autocomplete.noOptionsMessage,
        loadingMessage: () => config.autocomplete.loadingMessage
      }}
    />
  );
}