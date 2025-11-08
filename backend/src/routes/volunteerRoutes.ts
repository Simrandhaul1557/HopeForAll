import { Router, type Request, type Response } from 'express';
import Volunteer from '../models/Volunteer.js';
import Event from '../models/Event.js';

const router = Router();

// Test endpoint to verify volunteer routes are working
router.get('/test', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Volunteer routes are working!',
    timestamp: new Date()
  });
});

// Get all volunteers (for testing)
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Fetching all volunteers');
    const volunteers = await Volunteer.find({});
    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error: any) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Apply as a volunteer
router.post('/apply', async (req: Request, res: Response) => {
  try {
    console.log('Received volunteer application:', JSON.stringify(req.body, null, 2));
    
    const { name, email, phone, skills = [], availability = ['weekends'], address = '' } = req.body;
    
    // Basic validation
    if (!name || !email || !phone) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and phone are required' 
      });
    }

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer with this email already exists'
      });
    }
    
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      address,
      skills: Array.isArray(skills) ? skills : [skills],
      availability: Array.isArray(availability) ? availability : [availability]
      // _id and status will be set by the model defaults
    });
    
    console.log('Creating volunteer with data:', JSON.stringify(volunteer, null, 2));
    await volunteer.save();
    
    console.log('Volunteer saved successfully:', volunteer._id);
    
    res.status(201).json({
      success: true,
      data: volunteer,
      message: 'Volunteer application submitted successfully'
    });
  } catch (error: any) {
    console.error('Error in volunteer application:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing volunteer application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Register for an event
router.post('/:volunteerId/events/:eventId/register', async (req: Request, res: Response) => {
  try {
    const { volunteerId, eventId } = req.params;
    const { role } = req.body;
    
    // Find volunteer
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    // Find event
    const event = await Event.findById(eventId);
    if (!event || !event.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or inactive'
      });
    }
    
    // Check if already registered
    const alreadyRegistered = volunteer.events.some(e => e.eventId.toString() === eventId);
    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }
    
    // Check volunteer requirements if role is specified
    if (role) {
      const requirement = event.volunteerRequirements.find(r => r.role === role);
      if (requirement && requirement.filled >= requirement.quantity) {
        return res.status(400).json({
          success: false,
          message: `No more slots available for role: ${role}`
        });
      }
    }
    
    // Update volunteer's events
    volunteer.events.push({
      eventId,
      status: 'registered',
      registeredAt: new Date()
    });
    
    // Update event's volunteer count
    event.volunteerCount += 1;
    
    // Update filled count for the role if specified
    if (role) {
      const requirement = event.volunteerRequirements.find(r => r.role === role);
      if (requirement) {
        requirement.filled += 1;
      }
    }
    
    await Promise.all([volunteer.save(), event.save()]);
    
    res.json({
      success: true,
      message: 'Successfully registered for the event',
      data: {
        eventId,
        volunteerId,
        status: 'registered'
      }
    });
    
  } catch (error: any) {
    console.error('Error in event registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing event registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get volunteer's events
router.get('/:id/events', async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .select('events')
      .populate('events.eventId', 'title date time location');
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.json({
      success: true,
      data: volunteer.events
    });
    
  } catch (error: any) {
    console.error('Error fetching volunteer events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching volunteer events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
