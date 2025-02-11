import axios, { AxiosError, AxiosResponse } from "axios";

// const API_URL: string | undefined = process.env.BASE_API;
// console.log(API_URL)

// const API_URL: string | undefined = process.env.REACT_APP_BASE_API ?? "";
// const API_URL : string = "http://localhost:4000/api/v1"
const API_URL : string = "https://real-estate-backend-amber-nu.vercel.app/api/v1"
// const API_URL : string = "https://real-estate-backend-qfd9.onrender.com/api/v1"


console.log(API_URL); // Should print: http://localhost:4000/api/v1/

const makeURL = (URL: string): string => {
    return `${API_URL}/${URL}`;
};

const makeDeleteURL = (URL: string, id : string): string => {
    return `${API_URL}/${URL}/${id}`;
};



interface SuccessFn<T> {
    (data: T): void;
}

interface ErrorFn {
    (error: AxiosError): void;
}

export const getApi = async <T>(URL: string, params: object, successFn: SuccessFn<T>, errorFn: ErrorFn): Promise<void> => {
    try {
        const response: AxiosResponse<T> = await axios.get(makeURL(URL), { params });
        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const postApi = async <T>(URL: string, data: object, successFn: SuccessFn<T>, errorFn: ErrorFn): Promise<void> => {
    try {
        const response: AxiosResponse<T> = await axios.post(makeURL(URL), data);
        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const putApi = async <T>(URL: string, id: string | number, data: object, successFn: SuccessFn<T>, errorFn: ErrorFn): Promise<void> => {
    try {
        const response: AxiosResponse<T> = await axios.put(makeURL(URL), data);
        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const deleteApi = async <T>(URL: string, id: string, successFn: SuccessFn<T>, errorFn: ErrorFn): Promise<void> => {
    try {
        const response: AxiosResponse<T> = await axios.delete(makeDeleteURL(URL,id));
        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const getFileApi = async <T>(URL: string, id: string, successFn: SuccessFn<T>, errorFn: ErrorFn): Promise<void> => {
    try {
        const response: AxiosResponse<T> = await axios.get(makeDeleteURL(URL,id));
        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const uploadApi = async <T>(
    URL: string, 
    id: string, 
    file: File, 
    successFn: (data: T) => void, 
    errorFn: (error: AxiosError) => void
): Promise<void> => {
    try {
        const formData = new FormData();
        formData.append("file", file); // Attach file

        const response: AxiosResponse<T> = await axios.post(`${URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        successFn(response.data);
    } catch (error) {
        errorFn(error as AxiosError);
    }
};

export const downloadFile = async (documentId: string, fileName: string) => {
    try {
      const response = await axios.get(`${API_URL}/download/${documentId}`, {
        responseType: "blob", // Important for file download
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // File name for download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
