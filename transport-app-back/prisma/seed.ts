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
        from: "New York",
        destination: "Los Angeles",
        date: new Date("2024-12-01T09:00:00Z"),
        value: 350.50,
      },
      {
        from: "Chicago",
        destination: "Houston",
        date: new Date("2024-12-02T14:00:00Z"),
        value: 200.75,
      },
      {
        from: "San Francisco",
        destination: "Seattle",
        date: new Date("2024-12-03T10:30:00Z"),
        value: 150.00,
      },
      {
        from: "Miami",
        destination: "Orlando",
        date: new Date("2024-12-04T16:45:00Z"),
        value: 75.20,
      },
      {
        from: "Boston",
        destination: "Washington D.C.",
        date: new Date("2024-12-05T07:15:00Z"),
        value: 120.00,
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