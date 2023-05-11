import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();
import faker from '@faker-js/faker';

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
   await prisma.ticketType.createMany({
    data: [
      {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: faker.datatype.boolean(),
        includesHotel: faker.datatype.boolean(),
      },
      {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: true,
        includesHotel: faker.datatype.boolean(),
      },
      {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: false,
        includesHotel: true,
      },
    ]
  });
  const ticketTypes = await prisma.ticketType.findMany();
  console.log({ event });
  console.log( ticketTypes );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
