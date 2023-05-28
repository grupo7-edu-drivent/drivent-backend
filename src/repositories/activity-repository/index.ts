import { TicketActivity } from '@prisma/client';
import { prisma } from '@/config';

async function findActivityById(id: number) {
  return await prisma.activity.findFirst({
    where: {
      id,
    },
    include: {
      ActivityRoom: true,
    },
  });
}

async function countTicketActivity(activityId: number): Promise<number> {
  return await prisma.ticketActivity.count({
    where: {
      activityId,
    },
  });
}

async function verifyIfUserRegisterInActivity(ticketId: number, activityId: number) {
  return await prisma.ticketActivity.findFirst({
    where: {
      AND: [
        {
          ticketId,
        },
        {
          activityId,
        },
      ],
    },
  });
}

async function registerActivity(ticketId: number, activityId: number) {
  return await prisma.ticketActivity.create({
    data: {
      ticketId,
      activityId,
    },
  });
}

const activityRepository = {
  findActivityById,
  countTicketActivity,
  verifyIfUserRegisterInActivity,
  registerActivity,
};

export default activityRepository;
