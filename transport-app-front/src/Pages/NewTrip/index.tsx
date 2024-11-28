import { Box, Button, Card, CardContent, Rating, TextField, Typography } from "@mui/material";
import { Car, CarIcon, MapPin } from "lucide-react";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { trackPromise } from "react-promise-tracker";
import { RideService } from "../../Services/RideService";
import { RideEstimateRetunProps, RideOptionsProps } from "../../types/RideTypes";
import Swal from "sweetalert2";

export default function NewTrip() {
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [rideOptions, setRideOptions] =  useState<RideOptionsProps[]>([]);
  const [dataRide, setDataRide] =  useState<RideEstimateRetunProps | any>({});

  

  const handleNovaViagem = () => {
    trackPromise(RideService.fetchTripDrivers(origin, destination)).then(res =>{
      setRideOptions(res.data.data.options)
      setDataRide(res.data.data)
    })
  };

  
  const handleSelectDriver = (driver : RideOptionsProps) => {
    const reqBody = {
      "customer_id": sessionStorage.getItem('userId')?.toString() ?? '' ,
      "origin": origin,
      "destination": destination,
      "distance": dataRide.distance,
      "duration": dataRide.duration,
      "driver": {
      "id": driver.id,
      "name": driver.name
      },
      "value": driver.value
     }
    trackPromise(RideService.confirmRide(reqBody)).then(res =>{
      setRideOptions([])
      Swal.fire({
        title: 'Sucesso!',
        text: 'Viagem solicitada com suvesso',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }).catch(err => {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao solicitar viagem' + err,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  };

  return (
    <div >
      <div className="flex gap-1 flex-col md:flex-row">
        <span className="w-full md:w-[44%]">
          <TextField
            variant="outlined"
            placeholder="Onde você está?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            fullWidth
            className="bg-white"
          />
        </span>
        <span className="w-full md:w-[44%]">
          <TextField
            variant="outlined"
            placeholder="Para onde você vai?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
            className="bg-white"
          />
        </span>
        <Button
          variant="contained"
          onClick={handleNovaViagem}
          className="flex items-center "
        >
          <Car className="mr-2 h-4 w-fit" />
          Solicitar Viagem
        </Button>
      </div>

      <Card className="mt-4">
        <CardContent className="p-1">
          <div className="bg-muted rounded-lg flex flex-col w-full gap-4">
            {rideOptions && rideOptions?.map(rideOption => {
              return (
                <Card className="w-full hover:cursor-pointer active:bg-slate-100" key={rideOption.id} onClick={() => handleSelectDriver(rideOption)}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {rideOption.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {rideOption.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Vehicle:</strong> {rideOption.vehicle}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Value:</strong> ${parseFloat(rideOption.value.toString()).toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Rating value={rideOption.review.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary">
                      {rideOption.review.comment}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
