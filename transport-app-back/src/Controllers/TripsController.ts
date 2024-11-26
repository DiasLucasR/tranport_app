import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
const { format } = require('date-fns');


const prisma = new PrismaClient();

const TripsController = {
    
  index: async (req: Request, res: Response): Promise<Response> => {
    const { login, password } = req.body;
    try {
      let trips = await prisma.trips.findMany({
        where: {},
      });

      let tripsFormated = trips.map(trip => {
        const date = new Date(trip.date);
        trip.date = format(date, 'dd/MM/yyyy');
        return trip;
      })

      return res.status(200).json({
        status: "success",
        data: tripsFormated,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao deletar o usuário",
        error: error.message,
      });
    }
  },
  register: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;

    console.log(body)
    try {
  

      return res.status(200).json({
        status: "success",
        message: "Usuário deletado com sucesso",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao deletar o usuário",
        error: error.message,
      });
    }
  },
};

export default TripsController;
