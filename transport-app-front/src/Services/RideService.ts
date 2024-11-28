import { AxiosRequestConfig } from "axios";
import { ConfirmRideProps, DriverProps, ParamsAllRides } from "../types/RideTypes";
import ApiService from "./ApiService"

export class RideService {
    private static api = new ApiService();

   static fetchTripDrivers(origin: string, destination: string): Promise<any> {
        const userId = sessionStorage.getItem('userId');
        return this.api.post('ride/estimate', { origin, destination , customer_id: userId});
    }
    static confirmRide(data: ConfirmRideProps): Promise<any> {
        return this.api.patch('ride/confirm' , data);
    }
    static getAllRides(params?: ParamsAllRides): Promise<any> {
        const userId = sessionStorage.getItem('userId');
        const config: AxiosRequestConfig = { params };
        return this.api.get('ride/' + userId, config);
    }

    static getDrivers(): Promise<any> {
        return this.api.get('ride/drivers');
    }




}