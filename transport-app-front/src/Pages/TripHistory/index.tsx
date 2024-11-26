import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { ClockIcon, DollarSignIcon, Search, StarIcon } from "lucide-react";
import { trackPromise } from "react-promise-tracker";
import { RideService } from "../../Services/RideService";
import { RideProps } from "../../types/RideTypes";

const viagensAntigas = [
  {
    id: 1,
    destination: "Aeroporto",
    from: "Aeroporto",
    date: "2023-06-15",
    value: 45.5,
  },
];

function TripHistory() {
  const [history, setHistory] = useState<RideProps[]>([]);
  useEffect(() => {
    trackPromise(RideService.getAllRides()).then((res) => {
      setHistory(res.data.data);
    });
  }, []);

  return (
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
        <Box className="h-[400px] w-full rounded-md border p-4 overflow-auto">
          {history?.length &&
            history?.map((viagem) => {
              return (
                <div
                  key={viagem?.id}
                  className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
                >
                  <Avatar>
                    <img
                      src={`/placeholder.svg?text=${viagem?.destination}`}
                      alt={viagem.destination}
                    />
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{viagem.destination}</h3>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {viagem.date}
                      </span>
                      <span className="flex items-center">
                        <DollarSignIcon className="mr-1 h-4 w-4" />
                        R$ {viagem.value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default TripHistory;
