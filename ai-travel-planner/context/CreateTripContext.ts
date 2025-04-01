import { createContext, Dispatch, SetStateAction } from "react";

// Define a type for the context state
interface TripContextType {
  tripData: any;
  setTripData: Dispatch<SetStateAction<any>>;
}

// Provide a default value for context
export const CreateTripContext = createContext<TripContextType | null>(null);
