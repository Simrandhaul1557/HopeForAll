import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteerRequirement {
  role: string;
  description: string;
  quantity: number;
  filled: number;
}

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  endDate?: Date;
  location: string;
  address?: string;
  image?: string;
  isActive: boolean;
  maxVolunteers: number;
  volunteerCount: number;
  volunteerRequirements: IVolunteerRequirement[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  endDate: { type: Date },
  location: { type: String, required: true },
  address: { type: String },
  image: { type: String },
  isActive: { type: Boolean, default: true },
  maxVolunteers: { type: Number, default: 0 },
  volunteerCount: { type: Number, default: 0 },
  volunteerRequirements: [{
    role: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    filled: { type: Number, default: 0 }
  }]
}, {
  timestamps: true,
  _id: false // Disable auto _id since we're using our own string _id
});

// Create a pre-save hook to ensure _id is set
eventSchema.pre('save', function(next) {
  if (!this._id) {
    // Generate a simple ID if not provided
    this._id = Math.random().toString(36).substring(2, 15);
  }
  next();
});

export default mongoose.model<IEvent>('Event', eventSchema);
