import React from "react";
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

const viagensAntigas = [
  {
    id: 1,
    to: "Aeroporto",
    from: "Aeroporto",
    date: "2023-06-15",
    value: 45.5,
  },
  {
    id: 2,
    destino: "Shopping Center",
    data: "2023-06-10",
    valor: 22.3,
    avaliacao: 4.5,
  },
  {
    id: 3,
    destino: "Restaurante Le Fancy",
    data: "2023-06-05",
    valor: 35.0,
    avaliacao: 5.0,
  },
  {
    id: 4,
    destino: "Parque da Cidade",
    data: "2023-05-30",
    valor: 18.75,
    avaliacao: 4.7,
  },
  {
    id: 5,
    destino: "Estádio Municipal",
    data: "2023-05-25",
    valor: 28.9,
    avaliacao: 4.6,
  },
];

function TripHistory() {
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
          {viagensAntigas.map((viagem) => (
            <div
              key={viagem.id}
              className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0"
            >
              <Avatar>
                <img
                  src={`/placeholder.svg?text=${viagem.destino[0]}`}
                  alt={viagem.destino}
                />
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">{viagem.destino}</h3>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    {viagem.data}
                  </span>
                  <span className="flex items-center">
                    <DollarSignIcon className="mr-1 h-4 w-4" />
                    R$ {viagem.valor.toFixed(2)}
                  </span>
                  <span className="flex items-center">
                    <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    {viagem.avaliacao}
                  </span>
                </div>
              </div>
              <Button variant="outlined" size="small">
                Detalhes
              </Button>
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default TripHistory;
