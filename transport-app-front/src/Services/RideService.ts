import { DriverProps } from "../types/RideTypes";
import ApiService from "./ApiService"

export class RideService {
    private static api = new ApiService();

   static fetchTripDrivers(origin: string, destination: string): Promise<any> {
        const userId = sessionStorage.getItem('userId');
        return this.api.post('ride/estimate', { origin, destination , customer_id: userId});
    }
    static confirmRide(origin : string, destination : string, distance: number, duration: 'string', driver : DriverProps, value : number): Promise<any> {
        const userId = sessionStorage.getItem('userId');
        return this.api.patch('ride' ,{customer_id: userId, origin, destination, distance, duration, driver, value});
    }
    static getAllRides(): Promise<any> {
        const userId = sessionStorage.getItem('userId');
        return this.api.get('ride/' + userId);
    }

}