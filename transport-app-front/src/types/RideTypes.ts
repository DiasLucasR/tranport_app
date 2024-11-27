export interface RideProps {
    id: string;
    destination: string;
    date: string;
    value: number;
  }

  export interface DriverProps {
    id: number;
    name: string
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