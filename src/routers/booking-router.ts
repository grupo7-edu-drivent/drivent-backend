import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, listBooking, listBookingByRoomId } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/:roomId', listBookingByRoomId)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
