import {Destination} from "../assets/utils/Destination";
import {destinationsData} from "../assets/utils/Destination";
import React, {createContext, FC, ReactNode, useContext, useState} from "react";


const flattenedDestinationsData: Destination[] = destinationsData.flat();

interface DestinationsContextProps {
    destinations: Destination[];
    setDestination: React.Dispatch<React.SetStateAction<Destination[]>>;
    filters: { price: number; rating: number; country: string };
    setFilters: React.Dispatch<React.SetStateAction<{ price: number; rating: number; country: string }>>;
}

const DestinationContext = createContext<DestinationsContextProps | undefined>(undefined);

export const useDestination = () => {
    const context = useContext(DestinationContext);
    if (!context) {
        throw new Error('Context Error');
    }
    return context;
};

export const DestinationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [destinations, setDestination] = useState<Destination[]>(flattenedDestinationsData);
    const [filters, setFilters] = useState<{ price: number; rating: number; country: string }>({ price: 0, rating: 0, country: '' });

    return (
        <DestinationContext.Provider value={{ destinations, setDestination, filters, setFilters }}>
            {children}
        </DestinationContext.Provider>
    );
};