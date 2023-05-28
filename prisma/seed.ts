import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();
import faker from '@faker-js/faker';

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  await prisma.ticketType.createMany({
    data: [
      {
        name: 'EventName',
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
      {
        name: 'EventName',
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
      {
        name: 'EventName',
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    ],
  });
  const ticketTypes = await prisma.ticketType.findMany();
  let hotel = await prisma.hotel.findFirst();
  if(!hotel){
    await prisma.hotel.createMany({
      data: [
        {
          name: 'The Oberoi Vanyavilas',
          image: faker.image.business(),
        },
        {
          name: 'Riad Kniza',
          image: faker.image.business(),
        },
        {
          name: 'Portrait Firenze',
          image: faker.image.business(),
        },
      ],
    });
  }
  const hotelOberoi = await prisma.hotel.findFirst({
    where: {
      name: 'The Oberoi Vanyavilas',
    },
  });
  const hotelRiad = await prisma.hotel.findFirst({
    where: {
      name: 'Riad Kniza',
    },
  });
  const hotelPortrait = await prisma.hotel.findFirst({
    where: {
      name: 'Portrait Firenze',
    },
  });
  if (hotelOberoi && hotelRiad && hotelPortrait) {
    await prisma.room.createMany({
      data: [
        {
          name: '1',
          capacity: 1,
          hotelId: hotelOberoi.id,
        },
        {
          name: '2',
          capacity: 2,
          hotelId: hotelOberoi.id,
        },
        {
          name: '3',
          capacity: 3,
          hotelId: hotelOberoi.id,
        },
        {
          name: '1',
          capacity: 1,
          hotelId: hotelPortrait.id,
        },
        {
          name: '2',
          capacity: 2,
          hotelId: hotelPortrait.id,
        },
        {
          name: '3',
          capacity: 3,
          hotelId: hotelPortrait.id,
        },
        {
          name: '1',
          capacity: 1,
          hotelId: hotelRiad.id,
        },
        {
          name: '2',
          capacity: 2,
          hotelId: hotelRiad.id,
        },
        {
          name: '3',
          capacity: 3,
          hotelId: hotelRiad.id,
        },
        {
          name: '3',
          capacity: 3,
          hotelId: hotelRiad.id,
        },
      ],
    });
  }
  let activityRoom = await prisma.activityRoom.findFirst({});
  if(!activityRoom){
    await prisma.activityRoom.createMany({
      data: [
        {
          title: 'Auditório Principal'
        },
        {
          title: 'Auditório Lateral'
        },
        {
          title: 'Sala de Workshop'
        },
        {
          title: 'Online'
        }
      ]
    });
    await prisma.activity.createMany({
      data: [
        {
          title: 'Minecraft: montando o pc Ideal',
          capacity: 27,
          startDate: dayjs(Number(event.startsAt.getTime()) + 	90000000 ).toDate(),
          endDate: dayjs(Number(event.startsAt.getTime()) + 93600000 ).toDate(),
          activityRoomId: 1,
        },
        {
          title: 'Palestra x',
          capacity: 27,
          startDate: dayjs(Number(event.startsAt.getTime()) + 	97200000 ).toDate(),
          endDate: dayjs(Number(event.startsAt.getTime()) + 100800000 ).toDate(),
          activityRoomId: 2
        },
        {
          title: 'Palestra y',
          capacity: 27,
          startDate: dayjs(Number(event.startsAt.getTime()) + 	104400000 ).toDate(),
          endDate: dayjs(Number(event.startsAt.getTime()) + 108000000 ).toDate(),
          activityRoomId: 3,
        }
      ]
    });
  }
  const activity = await prisma.activity.findMany({
    include: {
      ActivityRoom: true;
    }
  })
  console.log({ event });
  console.log(ticketTypes);
  console.log(activity);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
