import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError, validateRequest, requireAuth, NotAuthorisedError } from '@samirlfc1/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title')
  .not()
  .isEmpty()
  .withMessage('Title is required'),

  body('price')
  .isFloat({ gt: 0 })
  .withMessage("price must be above 0")
], validateRequest, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorisedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });

  await ticket.save();

  res.send(ticket)
});

export { router as updateTicketRouter };
