import axios from "axios";
import { OrderPayload } from "./Orders/types";

const API_URL = 'http://localhost:8080';
const mapboxToken = '';

export function fetchProducts() {
    return axios(`${API_URL}/products`)
}

export function fetchLocalMapBox(local: string) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
}

export function saveOrder(payload: OrderPayload) {
    return axios.post(`${API_URL}/orders`, payload)
}