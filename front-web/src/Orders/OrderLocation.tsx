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
      "value": "avenida_atlantica_rj",
      "label": "Avenida Atlântica, Copacabana - Rio de Janeiro/RJ",
      "position": {
        "lat": -22.9711,
        "lng": -43.1822
      }
    },
    {
      "value": "rua_das_pedras_buzios",
      "label": "Rua das Pedras - Armação dos Búzios/RJ",
      "position": {
        "lat": -22.7456,
        "lng": -41.8815
      }
    },
    {
      "value": "avenida_beira_mar_fortaleza",
      "label": "Avenida Beira Mar - Fortaleza/CE",
      "position": {
        "lat": -3.7184,
        "lng": -38.5006
      }
    },
    {
      "value": "avenida_litoranea_sao_luis",
      "label": "Avenida Litorânea - São Luís/MA",
      "position": {
        "lat": -2.5000,
        "lng": -44.3000
      }
    },
    {
      "value": "avenida_beira_mar_salvador",
      "label": "Avenida Beira Mar - Salvador/BA",
      "position": {
        "lat": -12.9714,
        "lng": -38.5014
      }
    },
    {
      "value": "avenida_beira_mar_aracaju",
      "label": "Avenida Beira Mar - Aracaju/SE",
      "position": {
        "lat": -10.9111,
        "lng": -37.0717
      }
    },
    {
      "value": "avenida_beira_mar_natal",
      "label": "Avenida Beira Mar - Natal/RN",
      "position": {
        "lat": -5.7945,
        "lng": -35.2110
      }
    },
    {
      "value": "avenida_beira_mar_maceio",
      "label": "Avenida Beira Mar - Maceió/AL",
      "position": {
        "lat": -9.6658,
        "lng": -35.7350
      }
    },
    {
      "value": "avenida_beira_mar_recife",
      "label": "Avenida Beira Mar - Recife/PE",
      "position": {
        "lat": -8.0476,
        "lng": -34.8770
      }
    },
    {
      "value": "avenida_beira_mar_vitoria",
      "label": "Avenida Beira Mar - Vitória/ES",
      "position": {
        "lat": -20.3155,
        "lng": -40.3128
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