import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import GoogleMapsService from "../services/GoogleMapsService";
const { format } = require("date-fns");

export interface RideEstimateReturnProps {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
}

const prisma = new PrismaClient();

const RideController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    const params = req.params;
    const query = req.query;

    const whereConditions: any = {};

    if (params.customer_id) {
      whereConditions.userId = Number(params.customer_id);
    }
  
    if (query.driver_id && query.driver_id != '0') {
      whereConditions.driverId = Number(query.driver_id);
    }


    try {
      let trips: any = [];
      let ridesInfo: any = {};
      trips = await prisma.trips.findMany({
        where: whereConditions,
      });

      ridesInfo.rides = await Promise.all(
        trips.map(async (trip: any) => {
          let driverTrip = await prisma.drivers.findFirst({
            where: { id: trip.driverId },
          });
          trip.driver = {
            id: driverTrip?.id,
            name: driverTrip?.name,
          };
          return trip;
        })
      );
      ridesInfo.customer_id = params.customer_id;

      return res.status(200).json({
        status: "success",
        data: ridesInfo,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao buscar viagens",
        error: error.message,
      });
    }
  },
  confirmRide: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;

    let trip = await prisma.trips.create({
      data: {
        date: new Date(),
        origin: body.origin,
        driverId: body.driver.id,
        destination: body.destination,
        distance: Number(body.distance.replace("km", "").toString()),
        duration: body.duration,
        value: Number(body.value),
        userId: Number(body.customer_id),
      },
    });

    try {
      return res.status(200).json({
        status: "success",
        data: trip,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao deletar o usuário",
        error: error.message,
      });
    }
  },
  estimateRide: async (req: Request, res: Response): Promise<Response> => {
    const reqBody = req.body;
    let resBody: any = {};

    const origins = [reqBody.origin];
    const destinations = [reqBody.destination];

    try {
      const resultsGoogleDistance = await GoogleMapsService.calculateDistances(origins, destinations);

      resBody = resultsGoogleDistance[0];

      let drivers = await prisma.drivers.findMany({
        where: {
          minKm: {
            lte: parseFloat(
              resultsGoogleDistance[0].distance.replace("km", "")
            ),
          },
        },
      });
      resBody.options = [];

      resBody.options = drivers?.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: {
            rating: driver.rating,
          },
          value: driver.rate,
        };
      });

      return res.status(200).json({
        status: "success",
        data: resBody,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao deletar o usuário",
        error: error.message,
      });
    }
  },
  getAllDrivers: async (req: Request, res: Response): Promise<Response> => {
    try {
      let allDrivers = await prisma.drivers.findMany({});

      let drivers = allDrivers.map((driver) => {
        return { id: driver.id, name: driver.name };
      });

      return res.status(200).json({
        status: "success",
        data: drivers,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao buscar motoristas",
        error: error.message,
      });
    }
  },
};

export default RideController;
