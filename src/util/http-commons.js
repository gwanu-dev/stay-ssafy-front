import axios, { HttpStatusCode } from "axios";

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  // Request 발생 시 적용 내용
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";


  instance.interceptors.request.use((config) => {
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    }

  
  // AccessToken의 값이 유효하지 않을 때
  // RefreshToken을 이용해 재발급 처리
  //  https://maruzzing.github.io/study/rnative/axios-interceptors%EB%A1%9C-%ED%86%A0%ED%81%B0-%EB%A6%AC%ED%94%84%EB%A0%88%EC%8B%9C-%ED%95%98%EA%B8%B0/
  let isTokenRefreshing = false;

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const { config, response: { status } } = error;


      // 1. 페이지가 새로고침 되어 저장됨 accessToken이 없는 경우
      // 2. 토큰이 만료되어 더 이상 진행할 수 없는 경우
      if (status == HttpStatusCode.Unauthorized) {
        const originalRequest = config;
        

        // Token을 발급하는 동안 다른 요청이 발생하는 경우 대기, 다른 요청을 진행하면 토큰이 유효하지 않게 한다.
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
        }

        // Error가 발생했던 Component의 axios로 이동하는 경우, return
        return await instance.post("/member/refresh")
          .then((response) => {
            const newAccessToken = response.data.Authorization;
            instance.defaults.headers.common["Authorization"] = newAccessToken;
            originalRequest.headers.Authorization = newAccessToken;

            isTokenRefreshing = false;

            return instance(originalRequest);
          }).catch(err => {
            return err;
          });
      }
      else if (status == HttpStatusCode.Forbidden) {
        alert(error.response.data.message);
      }
    return Promise.reject(error);
    }
  );
  return instance;
}

// station vue api axios instance


export { localAxios };
