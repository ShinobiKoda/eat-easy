import { createContext, useState, useEffect, type ReactNode } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationContextType {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  setManualLocation: (address: string) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export const LocationProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<LocationData | null>(() => {
    const saved = localStorage.getItem("userLocation");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      localStorage.setItem("userLocation", JSON.stringify(location));
    }
  }, [location]);

  // Replace with your LocationIQ API key
  const LOCATIONIQ_API_KEY = "pk.3cb6ad9b4da0277492c6ef9230814689";
  const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`,
      );
      const data = await response.json();
      if (data && data.address) {
        const { road, house_number, city, town, village, suburb, state } =
          data.address;
        const streetPart = house_number
          ? `${house_number} ${road || ""}`
          : road || "";
        const cityPart = city || town || village || suburb || "";
        const statePart = state || "";
        if (streetPart && cityPart) {
          return `${streetPart}, ${cityPart}`;
        } else if (cityPart && statePart) {
          return `${cityPart}, ${statePart}`;
        } else if (data.display_name) {
          const parts = data.display_name.split(", ").slice(0, 2);
          return parts.join(", ");
        }
      }
      return "Unknown location";
    } catch {
      return "Unknown location";
    }
  };

  const getCurrentLocation = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      const { latitude, longitude } = position.coords;
      const address = await reverseGeocode(latitude, longitude);

      setLocation({
        latitude,
        longitude,
        address,
      });
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "Location permission denied. Please enable location access.",
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred.");
        }
      } else {
        setError("Failed to get location");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setManualLocation = (address: string) => {
    setLocation({
      latitude: 0,
      longitude: 0,
      address,
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        getCurrentLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
