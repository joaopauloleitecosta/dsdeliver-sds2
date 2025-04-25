import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

const initialPosition = {
    lat: -28.4351036,
    lng: -49.1878733 
}

type Place = {
    label?: string;
    value?: string;
    position: {
        lat: number;
        lng: number;
    } 
}

type Props = {
    onChangeLocation: (location: OrderLocationData) => void;
}

type OptionType = {
    label: string;
    value: string;
    position: {
        lat: number;
        lng: number;
    } 
};

const opcoesFixas: OptionType[] = [
  
    {
      "value": "rua_ida_zaneta",
      "label": "Rua Ida Zaneta",
      "position": {
        "lat": -28.4335,
        "lng": -49.1790
      }
    },
    {
      "value": "estrada_geral_azambuja",
      "label": "Estrada Geral de Azambuja",
      "position": {
        "lat": -28.4447,
        "lng": -49.1762
      }
    },
    {
      "value": "rua_jose_marcon",
      "label": "Rua José Marcon",
      "position": {
        "lat": -28.4320,
        "lng": -49.1800
      }
    },
    {
      "value": "rua_gabriel_s",
      "label": "Rua Gabriel S",
      "position": {
        "lat": -28.4300,
        "lng": -49.1750
      }
    },
    {
      "value": "estrada_geral_pedrinhas",
      "label": "Estrada Geral - Bairro Pedrinhas",
      "position": {
        "lat": -28.4284,
        "lng": -49.1212
      }
    }
  
  
    
];

function OrderLocation({ onChangeLocation }: Props) {

    const fetchLocations = async (inputValue: string): Promise<Place[]> => {
        if (!inputValue) return [];

        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            inputValue
            )}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`
        );

        const data = await response.json();

        return data.features.map((feature: any) => ({
            label: feature.place_name,
            value: feature.place_name,
            position: {
                lat: feature.center[1],
                lng: feature.center[0]
            }
        }));
    };

    const [address, setAddress] = useState<Place>({
        position: initialPosition
    });
    
    //Load fixed values
    const loadOptions = (inputValue: string): Promise<OptionType[]> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const filtradas = opcoesFixas.filter((opcao) =>
              opcao.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            resolve(filtradas);
          }, 500); // Simula um delay
        });
    };

    /*const loadOptions = (inputValue: string): Promise<Place[]> => {
        return fetchLocations(inputValue);
    };*/
      
    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
          latitude: place.position.lat,
          longitude: place.position.lng,
          address: place.label!
        });
    };

    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o produto deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect 
                        placeholder="Digite um endereço para entregar o pedido"
                        className="filter"
                        loadOptions={loadOptions}
                        defaultOptions={opcoesFixas}
                        onChange={value => handleChangeSelect(value as Place)} 
                    />   
                </div>
                <MapContainer center={address.position} zoom={15} key={address.position.lat} scrollWheelZoom>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={address.position}>
                    <Popup>
                        {address.label}
                    </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>       
    )
}

export default OrderLocation;