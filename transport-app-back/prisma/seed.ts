import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.userType.createMany({
    data: [
        {
            id: 1,
            description: 'Admin',
          },
          {
            id: 2,
            description: 'Driver',
          },
          {
            id: 3,
            description: 'Passenger',
          },
    ],
    skipDuplicates: true, // Ignora duplicados, se já existirem no banco
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '827ccb0eea8a706c4c34a16891f84e7b',
        userTypeId: 1,
      },
      {
        name: 'Driver User',
        email: 'driver@example.com',
        password: '827ccb0eea8a706c4c34a16891f84e7b',
        userTypeId: 2,
      },
      {
        name: 'Passenger User',
        email: 'passenger@example.com',
        password: '827ccb0eea8a706c4c34a16891f84e7b',
        userTypeId: 3,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.trips.createMany({
    data: [
      {
        origin: "New York",
        userId: 3,
        driverId: 1,
        destination: "Los Angeles",
        date: new Date("2024-12-01T09:00:00Z"),
        value: 350.50,
        distance: 5,
        duration: "5 min"
      },
      {
        origin: "Chicago",
        userId: 3,
        driverId: 1,
        destination: "Houston",
        date: new Date("2024-12-02T14:00:00Z"),
        value: 200.75,
        distance: 5,
        duration: "5 min"
      }
    ],
    skipDuplicates: true, 
  });



  await prisma.drivers.createMany({
    data:  [
      {
        name: "Homer Simpson",
        description:
          "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        car: "Plymouth Valiant 1973 rosa e enferrujado",
        rating: 2,
        rate: 2.50,
        minKm: 1,
      },
      {
        name: "Dominic Toretto",
        description:
          "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        car: "Dodge Charger R/T 1970 modificado",
        rating: 4,
        rate: 5.00,
        minKm: 5,
      },
      {
        name: "James Bond",
        description:
          "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        car: "Aston Martin DB5 clássico",
        rating: 5,
        rate: 10.00,
        minKm: 10,
      },
    ],
    skipDuplicates: true,
  });


 

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });