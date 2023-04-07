import { useEffect, useState } from 'react'
import Geocode from "react-geocode"

const useCurrentLocation = () => {
    const [currentAddress, setCurrentAddress] = useState("")
    const [findingLocation, setFindingLocation] = useState(true)
    const [coords, setCoords] = useState(null);

    //Fetch Coordinates
    const fetchCoordinates = () => {
        window?.navigator?.geolocation?.getCurrentPosition((geolocation) => {
            const coordinates = geolocation?.coords;
            setCoords(coordinates);
        })
    }
    // Fetch Address
    const fetchAddress = (coordinates) => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        Geocode.setApiKey(apiKey);
        Geocode.setLanguage("en");
        Geocode.setRegion("IN");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();
        if (coordinates) {
            Geocode.fromLatLng(coordinates.latitude, coordinates.longitude).then(
                (response) => {
                    let address = response.results[0].formatted_address;
                    setCurrentAddress(address);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            setFindingLocation(false)
        }
    }
    useEffect(() => {
        fetchCoordinates();
    }, [])
    useEffect(() => {
        fetchAddress(coords);
    }, [coords])
    // End Current Location
    return { findingLocation, currentAddress }
}

export default useCurrentLocation