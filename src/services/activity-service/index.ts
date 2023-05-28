import { conflictError, notFoundError, unauthorizedError } from '@/errors';
import { paymentRequired } from '@/errors/payment-required';
import activityRepository from '@/repositories/activity-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function listActivity(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw unauthorizedError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired();
  }

  return ticket;
}

async function registerActivity(userId: number, activityId: number) {
  const { id: ticketId } = await listActivity(userId);
  console.log('passou!');

  const activity = await activityRepository.findActivityById(activityId);
  if (!activity) throw notFoundError();

  const qtyActivityRegister = await activityRepository.countTicketActivity(activityId);
  if (qtyActivityRegister >= activity.capacity) throw unauthorizedError();

  const userRegister = await activityRepository.verifyIfUserRegisterInActivity(ticketId, activityId);
  if (userRegister) throw conflictError('User is already registered in this activity!');

  const register = await activityRepository.registerActivity(ticketId, activityId);
  return register;
}

const activityServices = {
  registerActivity,
};

export default activityServices;
