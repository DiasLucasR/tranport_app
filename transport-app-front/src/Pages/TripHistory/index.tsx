import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Avatar,
  Box,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { ClockIcon, DollarSignIcon, Search, StarIcon } from "lucide-react";
import { trackPromise } from "react-promise-tracker";
import { RideService } from "../../Services/RideService";
import { DriverProps, RideProps } from "../../types/RideTypes";
import tripLogoPlaceholder from "../../assets/images/trip_placeholder.jpg";
import { format } from "../../Helpers/format";

function TripHistory() {
  const [history, setHistory] = useState<RideProps[]>([]);
  const [drivers, setDrivers] = useState<DriverProps[]>([]);
  const [driverSelected, setDriverSelected] = useState<number>(0);

  useEffect(() => {
    trackPromise(RideService.getAllRides()).then((res) => {
      setHistory(res.data.data.rides);
    });
    trackPromise(RideService.getDrivers()).then((res) => {
      setDrivers(res.data.data);
    });
  }, []);

  const handleTripHistorySearch = () => {
    trackPromise(RideService.getAllRides({ driver_id: driverSelected })).then(
      (res) => {
        setHistory(res.data.data.rides);
      }
    );
  };

  return (
    <div>
      <div className="flex">
        <Card className="w-full ">
          <CardContent className="flex justify-between">
            <div>
            <h3>Filtros</h3><br />
            <div>
            <FormLabel>Motorista</FormLabel><br />
            <Select
              className="w-44"
              value={driverSelected}
              onChange={(e) => setDriverSelected(Number(e.target.value))}
            >
              <MenuItem disabled={true} className="bg-white" value={0}>
                --- Selecione ---
              </MenuItem>
              {drivers &&
                drivers.map((driver) => {
                  return (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  );
                })}
            </Select>
            </div>
            </div>
            <Button onClick={handleTripHistorySearch}>Buscar</Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <title>Suas Viagens Recentes</title>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <TextField
                type="search"
                placeholder="Buscar viagens..."
                className="pl-8 w-[200px]"
                variant="outlined"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Box className="min-h-[30vh] w-full rounded-md border p-4 overflow-auto">
            {history?.length ?
              history?.map((viagem) => {
                return (
                  <div
                    key={viagem?.id}
                    className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
                  >
                    <Avatar>
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={tripLogoPlaceholder}
                        alt={viagem.destination}
                      />
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold">
                        {" "}
                        {`Origem: ${viagem.origin}`}
                      </h3>
                      <h3 className="font-semibold">{`Destino: ${viagem.destination}`}</h3>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <ClockIcon className="mr-1 h-4 w-4" />
                          {format.formatDateTimeBR(viagem.date)}
                        </span>
                        <span className="flex items-center">
                          R$ {format.formatCurrency(viagem.value)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }) : <></>}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default TripHistory;
