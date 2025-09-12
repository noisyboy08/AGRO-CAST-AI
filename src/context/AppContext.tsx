import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PredictionData {
  crop: string;
  location: string;
  season: string;
  predictedYield: number;
  energyData?: {
    irrigationHours: number;
    fertilizerUsage: number;
    energyType: string;
    efficiencyScore: number;
  };
}

interface AppState {
  predictions: PredictionData[];
  currentPrediction: PredictionData | null;
}

type AppAction =
  | { type: 'ADD_PREDICTION'; payload: PredictionData }
  | { type: 'SET_CURRENT_PREDICTION'; payload: PredictionData }
  | { type: 'UPDATE_ENERGY_DATA'; payload: PredictionData['energyData'] };

const initialState: AppState = {
  predictions: [],
  currentPrediction: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_PREDICTION':
      return {
        ...state,
        predictions: [...state.predictions, action.payload],
        currentPrediction: action.payload,
      };
    case 'SET_CURRENT_PREDICTION':
      return {
        ...state,
        currentPrediction: action.payload,
      };
    case 'UPDATE_ENERGY_DATA':
      if (!state.currentPrediction) return state;
      const updatedPrediction = {
        ...state.currentPrediction,
        energyData: action.payload,
      };
      return {
        ...state,
        currentPrediction: updatedPrediction,
        predictions: state.predictions.map(p =>
          p === state.currentPrediction ? updatedPrediction : p
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}