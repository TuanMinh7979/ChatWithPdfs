import axios from "axios";
export const addQuestion = async (body) => {
  try {


    const response=  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/ask`, body);

    return response.data;

  } catch (error) {
    throw error;
  }
};
export const uploadFiles = async (body) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/uploadfile`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
