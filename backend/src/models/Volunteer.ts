import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteer extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  skills: string[];
  availability: string[];
  status: 'pending' | 'approved' | 'rejected';
  events: Array<{
    eventId: string;
    status: 'registered' | 'attended' | 'cancelled';
    registeredAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const volunteerSchema = new Schema<IVolunteer>({
  _id: { 
    type: String, 
    required: true,
    default: () => `vol_${Date.now().toString(36)}`
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: String,
  skills: [{ type: String }],
  availability: [{ type: String }],
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  events: [{
    eventId: { type: String, ref: 'Event' },
    status: { 
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    },
    registeredAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
