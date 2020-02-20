import React, { useState, useEffect } from 'react';

import api from 'services/api';
import withAuth from 'utils/withAuth';
import stateNames from './states.json';

import SelectWithLabel from 'components/SelectWithLabel';

export default function LocationSelector({ onChange, required }) {
  const [currentBRState, setCurrentBRState] = useState('');
  const [currentCity, setCurrentCity] = useState({});
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const br_states = stateNames.map(item => {
    return { value: item, label: item };
  });

  useEffect(() => {
    setIsLoading(true);
    setCurrentCity({});
    api
      .get('/locations', {
        ...withAuth,
        params: { state: currentBRState },
      })
      .then(res =>
        setCityList(
          res.data.map(item => {
            return { value: item.id, label: item.city };
          })
        )
      )
      .finally(setIsLoading(false));
  }, [currentBRState]);

  return (
    <>
      <SelectWithLabel
        name="location_state"
        label="Estado"
        required={required}
        options={br_states}
        onChange={opt => setCurrentBRState(opt.value)}
      />
      <SelectWithLabel
        name="location_city"
        label="Cidade"
        required={required}
        isDisabled={currentBRState === ''}
        isLoading={isLoading}
        options={cityList}
        value={currentCity}
        onChange={opt => {
          setCurrentCity(opt);
          onChange(opt.value);
        }}
      />
    </>
  );
}
