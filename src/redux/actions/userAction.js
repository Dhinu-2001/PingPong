import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import userAxiosInstance from "../../Axios/UserAxios";
import { toast } from "sonner";

export const userLoginAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { isRejectedWithValue }) => {
    try {
      const response = await userAxiosInstance.post("/token/", {
        email,
        password,
      });
      console.log("Response after login: ", response);
      if (response.status === 200) {
        return {
          success: true,
          message: "User login successfully",
          userData: response.data,
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
