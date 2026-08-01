import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPet extends Document {
  listingId?: string;
  title: string;
  listingType: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  age: string;
  height?: string;
  weight?: string;
  color: string;
  vaccinated: boolean;
  sterilized: boolean;
  medicalNotes?: string;
  description: string;
  images: string[];
  videos?: string[];
  ownerName: string;
  phone: string;
  email: string;
  country?: string;
  state: string;
  city: string;
  address?: string;
  pincode?: string;
  status: string;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new Schema<IPet>(
  {
    listingId: { type: String },
    title: { type: String, required: true },
    listingType: { type: String, required: true },
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    height: { type: String },
    weight: { type: String },
    color: { type: String, required: true },
    vaccinated: { type: Boolean, required: true, default: false },
    sterilized: { type: Boolean, required: true, default: false },
    medicalNotes: { type: String },
    description: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
    videos: { type: [String], default: [] },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, default: "United States" },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    status: { type: String, default: "Pending" },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "pets",
  }
);

// Prevent compiling model multiple times
const Pet: Model<IPet> =
  mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema);

export default Pet;
