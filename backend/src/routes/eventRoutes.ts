import { Router, Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';

const router = Router();

// Create a new event
router.post('/', async (req: Request, res: Response) => {
  try {
    const event = new Event({
      _id: `evt-${Date.now()}`,
      ...req.body,
      isActive: true,
      volunteerCount: 0,
      volunteerRequirements: req.body.volunteerRequirements || []
    });
    
    await event.save();
    res.status(201).json(event);
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(500).json({ 
      message: 'Error creating event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all active events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ date: 1 })
      .select('-__v -createdAt -updatedAt')
      .lean();
    
    res.json(events);
  } catch (error: unknown) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get a single event by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .select('-__v -createdAt -updatedAt')
      .lean();
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error: any) {
    console.error('Error fetching event:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Handle any /:id/register routes with 404
router.all('/:id/register', (req: Request, res: Response) => {
  res.status(404).json({ 
    success: false,
    message: 'Event registration is no longer available through this endpoint' 
  });
});

// Test endpoint to create a sample event
router.post('/test', async (req: Request, res: Response) => {
  try {
    const testEvent = new Event({
      _id: `test-${Date.now()}`,
      title: 'Test Event',
      description: 'This is a test event',
      date: new Date(),
      time: '14:00',
      location: 'Test Location',
      isActive: true
    });
    
    await testEvent.save();
    res.status(201).json(testEvent);
  } catch (error: any) {
    console.error('Error creating test event:', error);
    res.status(500).json({ 
      message: 'Error creating test event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
