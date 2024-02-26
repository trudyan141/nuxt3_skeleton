import axios from 'axios';
import debounce from 'lodash/debounce';
import { bannedCode } from '@/constants/oauth';

export const http = axios.create({
  baseURL: process.env.VUE_APP_API_DISCOVER || `https://api.nodo.xyz/`,
  timeout: 60000,
});

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const onAccessTokenFetched = (access_token) => {
  const mappedSubcribers = [...subscribers];
  mappedSubcribers.forEach((callback) => callback(access_token));
  subscribers = [];
};

const addSubscriber = (callback) => {
  subscribers.push(callback);
};

const resetStateAndDisconnect = debounce(() => {
  if (process.client) {
    let store = window.$nuxt.$store;
    store.dispatch('auth/logout');
  }
}, 2000);

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    if (process.client) {
      let store = window.$nuxt.$store;
      config.headers.common['Accept-Language'] =
        window.localStorage.getItem('locale') || 'en';

      // const accessToken = store.getters["wallet/getAccessToken"];
      let accountInfo = store?.state?.auth?.accountInfo || {};
      const accessToken =
        accountInfo.token_type && accountInfo.access_token
          ? `${accountInfo.token_type} ${accountInfo.access_token}`
          : '';
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data.data != undefined
        ? response.data.data
        : response.data;
    }
    return response;
  },
  (error) => {
    if (process.client) {
      let store = window.$nuxt.$store;

      const { config } = error;
      const originalRequest = config;
      const err = (error.response && error.response.data) || error;
      if (error.response && error.response.status === 401) {
        // if (error.response && error.response.status != 401) {

        if (!isAlreadyFetchingAccessToken && store) {
          isAlreadyFetchingAccessToken = true;
          store
            .dispatch('auth/refreshToken')
            .then(({ access_token }) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(access_token);
            })
            .catch(() => {
              resetStateAndDisconnect();
              return Promise.reject(err);
            });
        }

        if (error.response.data && error.response.data?.code === bannedCode) {
          return Promise.reject(err);
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(async (access_token) => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            const res = await axios(originalRequest);

            if (res.data) {
              resolve(res.data.data != undefined ? res.data.data : res.data);
            }
            resolve(res);
            // resolve(axios(originalRequest));
          });
        });

        return retryOriginalRequest;
      }

      if (error.response && error.response.status) {
        err.status = error.response.status;
      }

      return Promise.reject(err);
    }
  },
);
export default http;
