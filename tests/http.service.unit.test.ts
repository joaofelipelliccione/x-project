import { errorLoggerHandler, HttpService } from '@/http/http.service';
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

jest.mock('axios');
const MOCK_AXIOS = axios as jest.Mocked<typeof axios>;

describe('http.service.ts', () => {
  describe('[UNIT] errorLoggerHandler', () => {
    const MOCK_ENDPOINT = '/test';
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log the error correctly for AxiosError', () => {
      const mockError = {
        response: { status: 404 },
        message: 'Not Found',
        isAxiosError: true,
      } as AxiosError;

      jest.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);

      errorLoggerHandler('get', MOCK_ENDPOINT, mockError);

      expect(consoleSpy).toHaveBeenCalledWith(
        `[GET Error] URL: ${MOCK_ENDPOINT}, Status Code: ${mockError.response?.status}, Message: ${mockError.message}`
      );
    });

    it('should log the error correctly for generic Error', () => {
      const errorMessage = 'Generic error';
      const mockError = new Error(errorMessage);

      errorLoggerHandler('get', MOCK_ENDPOINT, mockError);

      expect(consoleSpy).toHaveBeenCalledWith(
        `[GET Error] URL: ${MOCK_ENDPOINT}, Status Code: N/A, Message: ${errorMessage}`
      );
    });

    it('should log "An unknown error occurred" for non-error objects', () => {
      const mockError = { foo: 'bar' };

      errorLoggerHandler('get', MOCK_ENDPOINT, mockError);

      expect(consoleSpy).toHaveBeenCalledWith(
        `[GET Error] URL: ${MOCK_ENDPOINT}, Status Code: N/A, Message: An unknown error occurred`
      );
    });
  });

  describe('[UNIT] HttpService', () => {
    let service: HttpService;
    const BASE_URL = 'http://example.com';
    const TIMEOUT = 3500;
    const HEADERS = { 'Content-Type': 'application/json' };

    beforeEach(() => {
      MOCK_AXIOS.create.mockReturnValue(MOCK_AXIOS);
      service = new HttpService(BASE_URL, TIMEOUT, HEADERS);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error if baseURL is not provided', () => {
      expect(() => new HttpService(undefined)).toThrow('A valid baseURL must be provided.');
    });

    it('should create an axios instance with the provided configuration', () => {
      expect(MOCK_AXIOS.create).toHaveBeenCalledWith({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
        headers: HEADERS,
      });
    });

    describe('HTTP Methods', () => {
      const ENDPOINT = '/test-endpoint';
      const DATA = { key: 'value' };
      const CONFIG: AxiosRequestConfig = { params: { id: 1 } };
      const MOCK_RESPONSE: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as AxiosHeaders },
      };

      beforeEach(() => {
        MOCK_AXIOS.get.mockResolvedValue(MOCK_RESPONSE);
        MOCK_AXIOS.post.mockResolvedValue(MOCK_RESPONSE);
        MOCK_AXIOS.put.mockResolvedValue(MOCK_RESPONSE);
        MOCK_AXIOS.patch.mockResolvedValue(MOCK_RESPONSE);
        MOCK_AXIOS.delete.mockResolvedValue(MOCK_RESPONSE);
      });

      it('should log and rethrow errors', async () => {
        const errorMessage = 'Network Error';
        const error = new Error(errorMessage);

        MOCK_AXIOS.get.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
          await service.get(ENDPOINT);
        } catch (e) {
          expect(e).toBe(error);
          expect(consoleSpy).toHaveBeenCalledWith(
            `[GET Error] URL: ${ENDPOINT}, Status Code: N/A, Message: ${errorMessage}`
          );
        }
      });

      it('should handle GET requests', async () => {
        const result = await service.get(ENDPOINT, CONFIG);

        expect(MOCK_AXIOS.get).toHaveBeenCalledWith(ENDPOINT, undefined, CONFIG);
        expect(result).toEqual(MOCK_RESPONSE.data);
      });

      it('should handle POST requests', async () => {
        const result = await service.post(ENDPOINT, DATA, CONFIG);

        expect(MOCK_AXIOS.post).toHaveBeenCalledWith(ENDPOINT, DATA, CONFIG);
        expect(result).toEqual(MOCK_RESPONSE.data);
      });

      it('should handle PUT requests', async () => {
        const result = await service.put(ENDPOINT, DATA, CONFIG);

        expect(MOCK_AXIOS.put).toHaveBeenCalledWith(ENDPOINT, DATA, CONFIG);
        expect(result).toEqual(MOCK_RESPONSE.data);
      });

      it('should handle PATCH requests', async () => {
        const result = await service.patch(ENDPOINT, DATA, CONFIG);

        expect(MOCK_AXIOS.patch).toHaveBeenCalledWith(ENDPOINT, DATA, CONFIG);
        expect(result).toEqual(MOCK_RESPONSE.data);
      });

      it('should handle DELETE requests', async () => {
        const result = await service.delete(ENDPOINT, CONFIG);

        expect(MOCK_AXIOS.delete).toHaveBeenCalledWith(ENDPOINT, undefined, CONFIG);
        expect(result).toEqual(MOCK_RESPONSE.data);
      });
    });
  });
});
