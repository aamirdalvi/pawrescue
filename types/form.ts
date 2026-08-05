export interface FormInputs {
  // Step 1
  title: string;
  listingType: string;
  description: string;
  // Step 2
  petName: string;
  species: string;
  breed: string;
  gender: string;
  age: string;
  ageYears?: string;
  ageMonths?: string;
  height?: string;
  heightUnit?: string;
  weight?: string;
  weightUnit?: string;
  color: string;
  // Step 3
  vaccinated: boolean;
  sterilized: boolean;
  microchipped?: boolean;
  specialNeeds?: boolean;
  friendlyChildren?: boolean;
  friendlyDogs?: boolean;
  friendlyCats?: boolean;
  medicalNotes?: string;
  // Step 4
  country: string;
  state: string;
  city: string;
  area: string;
  address: string;
  pincode: string;
  // Step 5
  images: string[];
  videos: string[];
  // Step 6
  ownerName: string;
  phone: string;
  email: string;
  preferredContact: string;
  contactTime?: string;
  sameWhatsApp?: boolean;
}
