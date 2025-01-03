import React, { useState } from "react";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { useAuth } from "../../Contexts/UserContext";
import { cn } from "../../Utilities/utils";
import TripHistory from "../TripHistory";
import NewTrip from "../NewTrip";

export default function Home() {
  const [tabValue, setTabValue] = useState("nova-viagem");
  const { logout } = useAuth();

  return (
    <div className="w-full bg-slate-100">
      <span className="flex w-full justify-end p-1">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          Sair
        </button>
      </span>
      <Card className="w-full">
        <CardContent className="bg-slate-100">
        <Typography variant="h5" component="div" gutterBottom> Bem vindo(a) {sessionStorage.getItem('userName')}</Typography>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            className="space-y-4 w-full"
          >
            <Tab label="Nova Viagem" value="nova-viagem" />
            <Tab label="Histórico de Viagens" value="historico" />
          </Tabs>
          <Box className="w-full">
            <div className={cn(tabValue === "nova-viagem" ? "block" : "hidden")} >
              <NewTrip />
            </div>
            <div className={tabValue === "historico" ? "block" : "hidden"}>
              <TripHistory />
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
