import { DistanceMatrixRow } from "@googlemaps/google-maps-services-js";

const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

interface DistanceResult {
  origin: string;
  destination: string;
  distance: string | "N/A";
  duration: string | "N/A";
}
const GoogleMapsService = {
  calculateDistances: async (
    origins: string[],
    destinations: string[]
  ): Promise<DistanceResult[]> => {
    try {
      const response: any = await client.distancematrix({
        params: {
          origins,
          destinations,
          key: apiKey,
        },
      });

      const distances: DistanceResult[] = response.data.rows.flatMap(
        (row: DistanceMatrixRow, i: number) =>
          row.elements.map((element, j) => ({
            origin: origins[i],
            destination: destinations[j],
            distance: element.distance ? element.distance.text : "N/A",
            duration: element.duration ? element.duration.text : "N/A",
          }))
      );

      return distances;
    } catch (error: any) {
      console.error(
        "Error calculating distances:",
        error.response?.data || error.message
      );
      throw new Error("Failed to calculate distances");
    }
  },
};

export default GoogleMapsService;
