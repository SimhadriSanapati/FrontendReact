import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Coupons } from "./Cuopons";
import api from "./axios";

// =====================================================
// ⭐ AXIOS INSTANCE WITH TOKEN INTERCEPTOR
// =====================================================
// const api = axios.create({
//   baseURL: "http://localhost:7000/api/v1/products",
// });

// Attach token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// =====================================================
// CART SLICE
// =====================================================
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },

    decrementCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) {
        if (item.qty > 1) item.qty -= 1;
        else return state.filter((i) => i.id !== action.payload);
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addToCart, decrementCart, removeFromCart } = cartSlice.actions;

// =====================================================
// COUPON SLICE
// =====================================================
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discountApplied: 0,
    applied: false,
    message: "",
  },
  reducers: {
    applyCoupons: (state, action) => {
      const enteredCode = action.payload.toUpperCase();
      if (Coupons[enteredCode]) {
        state.code = enteredCode;
        state.discountApplied = Coupons[enteredCode];
        state.applied = true;
        state.message = `Coupon "${enteredCode}" applied successfully!`;
      } else {
        state.message = `Invalid coupon code "${enteredCode}". Please try again.`;
      }
    },
  },
});

export const { applyCoupons } = couponSlice.actions;

// =====================================================
// HOME PRODUCTS THUNK + SLICE
// =====================================================
export const fetchHomeProducts = createAsyncThunk(
  "homeproducts/fetchHomeProducts",
  async () => {
    const response = await api.get("/getAllHome");
    return response.data;
  }
);

const homeProductsSlice = createSlice({
  name: "homeproducts",
  initialState: { Home: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.Home = action.payload;
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// VEG PRODUCTS THUNK + SLICE
// =====================================================
export const fetchVegProducts = createAsyncThunk(
  "vegproducts/fetchVegProducts",
  async () => {
    const response = await api.get("/getAllVeg");
    return response.data;
  }
);

const vegSlice = createSlice({
  name: "vegproducts",
  initialState: { Veg: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.Veg = action.payload;
      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// PLACE ORDER THUNK + SLICE
// =====================================================
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { loading: false, success: false, orderDetails: null, error: null },
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.orderDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetails = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// GET ORDERS THUNK + SLICE
// =====================================================
export const fetchOrders = createAsyncThunk(
  "getorders/fetchOrders",
  async () => {
    const response = await api.get("/getOrders");
    return response.data;
  }
);

const getOrdersSlice = createSlice({
  name: "getorders",
  initialState: { loading: false, orderDetails: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// REGISTRATION THUNK + SLICE
// =====================================================
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (formData) => {
    const response = await api.post("/register", formData);
    return response.data;
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: { loading: false,
                  user: null,
                   error: null,
                  success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// LOGIN THUNK + SLICE
// =====================================================
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData) => {
    const response = await api.post("/login", formData);
    return response.data; // must return { user, token }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// =====================================================
// STORE EXPORT
// =====================================================
const Store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    homeproducts: homeProductsSlice.reducer,
    vegproducts: vegSlice.reducer,
    orders: ordersSlice.reducer,
    getorders: getOrdersSlice.reducer,
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default Store;
