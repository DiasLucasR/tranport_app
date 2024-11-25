import { Button, Card, CardContent, TextField } from "@mui/material";
import { CarIcon, MapPin } from "lucide-react";
import React, { useState } from "react";

export default function NewTrip() {
  const [destino, setDestino] = useState("");

  const handleNovaViagem = () => {
    console.log("Iniciando nova viagem para:", destino);
    // Aqui você implementaria a lógica para iniciar uma nova viagem
  };

  return (
    <div>
      <div className="flex space-x-2">
        <TextField
          variant="outlined"
          placeholder="Para onde você vai?"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleNovaViagem}
          className="flex items-center"
        >
          <CarIcon className="mr-2 h-4 w-4" />
          Solicitar Viagem
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              Mapa será exibido aqui
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
