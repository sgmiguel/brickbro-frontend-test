import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'


export default function SearchInput({ onChange }: { onChange: (option: Option) => void }) {
  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      apiOptions={{
        language: 'es',
      }}
      selectProps={{
        onChange,
        placeholder: 'Introduce una dirección...',
        noOptionsMessage: () => 'Sin resultados',
        loadingMessage: () => 'Buscando...',
      }}
    />
  );
}