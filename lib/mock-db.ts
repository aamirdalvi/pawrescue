import { FormInputs } from "@/types/form";

export interface PetListing extends FormInputs {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
  views: number;
}

// Global in-memory store shared across browser window and Node runtime
declare global {
  var __paw_rescue_listings_store__: PetListing[] | undefined;
}

function getStore(): PetListing[] {
  if (typeof window !== "undefined") {
    const win = window as unknown as {
      __paw_rescue_listings_store__?: PetListing[];
    };
    if (!win.__paw_rescue_listings_store__) {
      win.__paw_rescue_listings_store__ = [];
    }
    return win.__paw_rescue_listings_store__;
  }
  if (!globalThis.__paw_rescue_listings_store__) {
    globalThis.__paw_rescue_listings_store__ = [];
  }
  return globalThis.__paw_rescue_listings_store__;
}

export async function getAllListings(): Promise<PetListing[]> {
  const store = getStore();
  return [...store].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getListingById(id: string): Promise<PetListing | null> {
  const store = getStore();
  const listing = store.find((item) => item.id === id);
  if (!listing) return null;
  return { ...listing };
}

export async function createListing(
  data: Omit<PetListing, "id" | "createdAt" | "updatedAt" | "status" | "views">
): Promise<PetListing> {
  const store = getStore();
  const newId = Math.random().toString(36).substring(2, 11);
  const now = new Date().toISOString();
  const newListing: PetListing = {
    ...data,
    id: newId,
    createdAt: now,
    updatedAt: now,
    status: "active",
    views: 0,
  };
  store.push(newListing);
  return { ...newListing };
}

export async function updateListing(
  id: string,
  data: Partial<PetListing>
): Promise<PetListing | null> {
  const store = getStore();
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  const updated = {
    ...store[index],
    ...data,
    updatedAt: now,
  };
  store[index] = updated;
  return { ...updated };
}

export async function deleteListing(id: string): Promise<boolean> {
  const store = getStore();
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}

export async function incrementViews(id: string): Promise<number | null> {
  const store = getStore();
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return null;
  store[index].views = (store[index].views || 0) + 1;
  return store[index].views;
}
