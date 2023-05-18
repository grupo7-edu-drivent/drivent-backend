import { Event } from '@prisma/client';
import { prisma, redis } from '@/config';

async function findFirst() {
  const cacheKey = 'event';
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    const event = JSON.parse(cachedEvent) as Event;
    return event;
  }

  const event = prisma.event.findFirst();
  redis.setEx(cacheKey, 3600, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
