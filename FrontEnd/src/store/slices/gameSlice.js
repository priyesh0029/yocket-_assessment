import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stage: 'landing',
  copSelections: [],
  currentCop: null,
  cities: [],
  vehicles: [],
  places :[],
  result: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    setCopSelections: (state, action) => {
      state.copSelections = action.payload;
    },
    setCurrentCop: (state, action) => {
      state.currentCop = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const {
  setStage,
  setCopSelections,
  setCurrentCop,
  setCities,
  setPlaces,
  setVehicles,
  setResult,
} = gameSlice.actions;

export default gameSlice.reducer;
