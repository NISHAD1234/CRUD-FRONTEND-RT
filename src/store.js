import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000";

export const GET = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/user`);
    await dispatch(getdata(res.data.data));
    // return console.log(res.data.data);
  } catch (error) {
    return console.error(error);
  }
};

export const ADD = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/user/add `, payload);
    await dispatch(adddata(payload));
    return console.log(res.data.data);
  } catch (error) {
    return console.error(error);
  }
};

export const DELETE = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/user/delete `, payload);
    await dispatch(del(payload));
    // return console.log(res.data.data);
  } catch (error) {
    return console.error(error);
  }
};


export const UPDATE = (payload) => async (dispatch) => {
    try {
      const res = await axios.post(`${API_URL}/user/update `, payload);
      await dispatch(up(payload));
      // return console.log(res.data.data);
    } catch (error) {
      return console.error(error);
    }
  };
// export const fetchCompanies = createAsyncThunk('companies/fetchAll', async () => {
//   const response = await axios.get(`${API_URL}/user`);
//   return response.data;
// });

// export const addCompany = createAsyncThunk('companies/add', async (company) => {
//   const response = await axios.post(`${API_URL}/user/add`, company);
//   return response.data;
// });

// export const updateCompany = createAsyncThunk('companies/update', async (company) => {
//   const response = await axios.post(`${API_URL}/user/update`, company);
//   return response.data;
// });

// export const deleteCompany = createAsyncThunk('companies/delete', async (id) => {
//   const response = await axios.post(`${API_URL}/user/delete`, { id });
//   return response.data;
// });

const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getdata: (state, action) => {
      state.data = [...action.payload];
    },

    adddata: (state, action) => {
      state.data.push(action.payload);
      console.log(action.payload)
    },

    del: (state, action) => {
      state.data = state.data.filter((el) => el.id !== action.payload.id);
    },

    up:(state,action)=>{
        
        state.data.map((elm)=>{
            if(elm.id==action.payload.id){
                return  (elm.name=action.payload.name,
                elm.age=action.payload.age,
                elm.City=action.payload.City
                )
            }
        })
      
    }
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchCompanies.pending, (state) => {
  //         state.status = 'loading';
  //       })
  //       .addCase(fetchCompanies.fulfilled, (state, action) => {
  //         state.status = 'succeeded';
  //         state.entities = action.payload.data;
  //       })
  //       .addCase(fetchCompanies.rejected, (state, action) => {
  //         state.status = 'failed';
  //         state.error = action.error.message;
  //       })
  //       .addCase(addCompany.fulfilled, (state, action) => {
  //         state.entities.push(action.payload);
  //       })
  //       .addCase(updateCompany.fulfilled, (state, action) => {
  //         const index = state.entities.findIndex((company) => company.id === action.payload.id);
  //         state.entities[index] = action.payload;
  //       })
  //       .addCase(deleteCompany.fulfilled, (state, action) => {
  //         const index = state.entities.findIndex((company) => company.id === action.payload.id);
  //         state.entities.splice(index, 1);
  //       });
  //   },
});

export const { getdata, adddata, del ,up} = companiesSlice.actions;
export default companiesSlice.reducer;

