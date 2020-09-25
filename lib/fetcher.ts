/* eslint-disable @typescript-eslint/no-explicit-any */
interface ErrorWithResponse extends Error {
  response: Response;
  data: any;
}

const fetcher: (url: string, option?: any) => Promise<any> = async (
  url: string,
  option?: any,
) => {
  try {
    const response = await fetch(url, option);

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as ErrorWithResponse;
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};

export default fetcher;
