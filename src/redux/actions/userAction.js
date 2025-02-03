import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import userAxiosInstance from "../../Axios/UserAxios";
import { toast } from "sonner";
import { encryptToken } from "../../utils/TokenUtils";

export const userLoginAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { isRejectedWithValue }) => {
    try {
      const response = await userAxiosInstance.post("/token/", {
        email,
        password,
      });
      
      const data = response.data
      const encryptedData = {
        ...data,
        accessToken: encryptToken(data.accessToken),
        refreshToken: encryptToken(data.refreshToken)
      }

      console.log("Response after login: ", response);
      if (response.status === 200) {
        return {
          success: true,
          message: "User login successfully",
          userData: encryptedData,
        };
      } else if(response.status === 401) {
        const errorMessage = response?.error || "Login failed";
        console.error(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error in userLoginAction thunk: ", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);



export const userRefreshAction = createAsyncThunk(
  "user/refresh",
  async ({ refresh }, { isRejectedWithValue }) => {
    try {
      const response = await userAxiosInstance.post("/token/refresh/", {
        'refresh' : refresh
      });
      
      const data = response.data
      const encryptedData = {
        ...data,
        accessToken: encryptToken(data.access),
        refreshToken: encryptToken(refresh)
      }

      console.log("Response after login: ", response);
      if (response.status === 200) {
        return {
          success: true,
          message: "User login successfully",
          userData: encryptedData,
        };
      } else if(response.status === 401) {
        const errorMessage = response?.error || "Login failed";
        console.error(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error in userLoginAction thunk: ", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);
