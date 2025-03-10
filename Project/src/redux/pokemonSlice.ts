import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { CancelTokenSource } from 'axios';

interface PokemonState {
  pokemonList: any[];
  pokemonTypes: any[];
  selectedType: string | null;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonTypes: [],
  selectedType: null,
  viewMode: 'grid',
  isLoading: false,
  error: null,
};

let cancelToken: CancelTokenSource | null = null;

// Fetch Pokémon Types
export const fetchPokemonTypes = createAsyncThunk('pokemon/fetchTypes', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  return response.data.results;
});

// Fetch Pokémon List
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchList',
  async ({ type }: { type: string | null }, { rejectWithValue }) => {
    if (cancelToken) cancelToken.cancel();
    cancelToken = axios.CancelToken.source();

    try {
      let url = type ? `https://pokeapi.co/api/v2/type/${type}` : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
      const response = await axios.get(url, { cancelToken: cancelToken.token });
      return type ? response.data.pokemon.map((p: any) => p.pokemon) : response.data.results;
    } catch (error: any) {
      if (axios.isCancel(error)) return rejectWithValue('Request Cancelled');
      return rejectWithValue(error.message);
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.pokemonTypes = action.payload;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setViewMode } = pokemonSlice.actions;
export default pokemonSlice.reducer;
