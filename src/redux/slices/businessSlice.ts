import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Transaction {
  buyerName: string;
  quantity: number;
  date: string;
}

interface Due {
  buyerName: string;
  amount: number;
  date: string;
}

interface BusinessState {
  totalStock: number;
  totalCash: number;
  transactions: Transaction[];
  dues: Due[];
}

const initialState: BusinessState = {
  totalStock: 0,
  totalCash: 0,
  transactions: [],
  dues: [],
};

export const fetchTransactions = createAsyncThunk<Transaction[]>('business/fetchTransactions', async () => {
  const response = await axios.get('http://localhost:5000/transactions');
  return response.data;
});

export const fetchDues = createAsyncThunk<Due[]>('business/fetchDues', async () => {
  const response = await axios.get('http://localhost:5000/dues');
  return response.data;
});

export const addTransactionToDB = createAsyncThunk<void, Transaction>('business/addTransactionToDB', async (transaction) => {
  await axios.post('http://localhost:5000/transactions', transaction);
});

export const addDueToDB = createAsyncThunk<void, Due>('business/addDueToDB', async (due) => {
  await axios.post('http://localhost:5000/dues', due);
});

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setTotalStock: (state, action) => {
      state.totalStock = action.payload;
    },
    setTotalCash: (state, action) => {
      state.totalCash = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(fetchDues.fulfilled, (state, action) => {
        state.dues = action.payload;
      });
  },
});

export const { setTotalStock, setTotalCash } = businessSlice.actions;

export default businessSlice.reducer;
