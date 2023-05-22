import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketPaidByUserId, getTicketTypes, getTickets } from '@/controllers';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .get('/paid', getTicketPaidByUserId)
  .post('/', validateBody(ticketsSchema), createTicket);

export { ticketsRouter };
