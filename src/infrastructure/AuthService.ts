import Axios, { AxiosError } from "axios";
import { BaseApi, ChangeProfileType } from "./types";
import { LoginOtpRequest, LoginRequest, SignUpRequest, User } from "../common";
import { BaseApiResponse } from "../common/types/apiTypes";
import { baseApi } from "./BaseApi";
import { omit } from "lodash";

class AuthService {
  private baseService: BaseApi;
  private baseUrl: string = "/manufacturer";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  async login(credentials: string): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/login";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.post<
        BaseApiResponse<User>,
        LoginRequest
      >(url, {
        credentials,
      });
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  async verifyOtp(
    credentials: string,
    otp: string
  ): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/verify-otp";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.post<
        BaseApiResponse<User>,
        LoginOtpRequest
      >(url, {
        credentials,
        otp,
      });
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  async signup(body: SignUpRequest): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/register";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.post<
        BaseApiResponse<User>,
        SignUpRequest
      >(url, body);
      const { status, data } = apiResponse;
      if (status === 201) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async changeProfile(body: User): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/" + body._id + "/changeProfile";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.put<
        BaseApiResponse<User>,
        ChangeProfileType
      >(url, omit(body, ["_id", "__v", "isVerified"]));
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async fetchProfile(): Promise<BaseApiResponse<User>> {
    const url = this.baseUrl + "/profile";
    const result: BaseApiResponse<User> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<BaseApiResponse<User>>(
        url
      );
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: loginData, success, error } = data || {};
        if (success) {
          result.data = loginData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async logout(): Promise<BaseApiResponse<string>> {
    const url = this.baseUrl + "/logout";
    const result: BaseApiResponse<string> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      const apiResponse = await this.baseService.get<BaseApiResponse<string>>(
        url
      );
      const { status, data } = apiResponse;
      if (status === 200) {
        const { data: logoutData, success, error } = data || {};
        if (success) {
          result.data = logoutData;
          result.success = true;
        } else {
          const msg = error?.message || "";
          throw Error(msg);
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  protected handleError<T>(err: any, result: BaseApiResponse<T>) {
    let message = err?.message;
    const error = err as AxiosError;
    if (error?.isAxiosError) {
      message = ((error?.response?.data as any)?.error as any)?.message;
    }
    const cancelled = Axios.isCancel(err);
    result.success = false;
    result.cancelled = cancelled;
    result.error = {
      message: cancelled ? "Server call has been cancelled" : message,
    };
  }
}

export const authService = new AuthService(baseApi);
