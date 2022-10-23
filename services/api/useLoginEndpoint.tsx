import axios, { AxiosResponse, AxiosError } from "axios";
import { useTranslation } from "../../hooks";

type loginResponse = {
  userId: number;
  accessToken: string;
};

type loginRequest = {
  username: string;
  password: string;
};

const useLoginEndpoint = () => {
  const { t } = useTranslation();
  const url = "http://35.244.150.255/autenticador/auth";

  const loadLogin = async ({ username, password }: loginRequest) => {
    try {
      const response: AxiosResponse<loginResponse> = await axios.post(url, {
        username,
        password,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw t("login.error.unauthorized");
      } else {
        throw t("login.error.server");
      }
    }
  };

  return { loadLogin };
};

export default useLoginEndpoint;
