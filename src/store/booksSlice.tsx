import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AllBooksInfo,
  BooksState,
  FormValuesProps,
  Items,
} from "../interfaces/interfaces";
import { BASE_URL, MAX_RESULTS } from "../constants/api";

const initialState: BooksState = {
  items: [],
  status: "idle",
  loadedItems: 0,
  searchStructure: {
    searchTerm: "",
    category: "",
    sort: "",
    page: 0,
  },
  isButtonLoading: false,
};

export const getBooksItems = createAsyncThunk(
  "books/getBooks",
  async (values: FormValuesProps) => {
    const { searchTerm, sort, category, page } = values;
    const startIndex = MAX_RESULTS * page;

    const result = await axios.get<AllBooksInfo>(
      `${BASE_URL}?q=${searchTerm}+subject:${category}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&orderBy=${sort}`,
    );

    return result.data;
  },
);

export const booksSlice = createSlice({
  name: "volumeList",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBooksItems.pending, (state) => {
        state.status = "loading";
        state.isButtonLoading = true;
      })
      .addCase(getBooksItems.fulfilled, (state, { meta, payload }) => {
        state.status = "succeeded";
        const books: Items[] = [];
        for (const book of payload.items) {
          books.push({
            ...book,
          });
        }
        state.items = books;
        state.searchStructure = meta.arg;
        state.loadedItems = payload.totalItems;
        state.isButtonLoading = false;
      })
      .addCase(getBooksItems.rejected, (state) => {
        state.status = "failed";
        state.isButtonLoading = false;
      });
  },
});

export default booksSlice.reducer;
