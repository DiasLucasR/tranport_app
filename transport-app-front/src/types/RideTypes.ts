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