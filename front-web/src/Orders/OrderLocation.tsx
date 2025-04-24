import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import AsyncSelect from 'react-select/async';

const position = {
    lat: -28.4351036,
    lng: -49.1878733 
}

function OrderLocation() {
    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o produto deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect>
                    </AsyncSelect>    
                </div>
                <MapContainer center={position} zoom={18} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                    <Popup>
                        Meu marcador
                    </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>       
    )
}

export default OrderLocation;