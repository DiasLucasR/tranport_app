export interface RideProps {
  date: string; 
  destination: string;
  distance: number; 
  driver: DriverProps;
  driverId: number;
  duration: string; 
  id: number;
  origin: string;
  userId: number;
  value: number;
}
  export interface DriverProps {
    id: number;
    name: string
  }
  
  export interface RideHistoryProps{
    customer_id: string,
    rides: RideProps[]
  }

  export interface ParamsAllRides{
    driver_id: number;
  }
  export interface TripHistoryProps{
    history: RideHistoryProps
  }
  export interface RideConfirmProps {
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: DriverProps;
    value: number;
  }

  export interface RideOptionsProps{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }
  export interface RideEstimateRetunProps {
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
    distance: number;
    duration: string;
    options: RideOptionsProps[]
  }

  export interface ConfirmRideProps {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  };