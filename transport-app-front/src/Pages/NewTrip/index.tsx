import { Button, Card, CardContent, TextField } from "@mui/material";
import { Car, CarIcon, MapPin } from "lucide-react";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { trackPromise } from "react-promise-tracker";
import { RideService } from "../../Services/RideService";

export default function NewTrip() {
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");

  

  const handleNovaViagem = () => {
    console.log("Iniciando nova viagem para:", destination);
    trackPromise(RideService.fetchTripDrivers(origin, destination)).then(resp =>{

    })
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div>
      <div className="flex gap-1 flex-col md:flex-row">
        <span className="w-full md:w-[44%]">
          <TextField
            variant="outlined"
            placeholder="Onde você está?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            fullWidth
          />
        </span>
        <span className="w-full md:w-[44%]">
          <TextField
            variant="outlined"
            placeholder="Para onde você vai?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
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
        <CardContent className="p-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center w-full h-24">
            <MapPin className="h-12 w-12 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              ></GoogleMapReact>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
