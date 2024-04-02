import { useState } from "react";
import axiosClient from "../config/axios";

const useMutation = ({ url, method }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    responseData: null,
  });

  const fn = async (data, projectId, moodboardId) => {
    // Accept both projectId and moodboardId as optional parameters
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      let response;
      if (moodboardId) {
        response = await axiosClient(projectId, moodboardId)[
          method.toLowerCase()
        ](url, data);
      } else {
        response = await axiosClient(projectId)[method.toLowerCase()](
          url,
          data
        );
      }
      console.log("Response data:", response.data); // Log the response data
      setState({ isLoading: false, error: "", responseData: response.data }); // Set responseData on success
    } catch (error) {
      setState({ isLoading: false, error, responseData: null }); // Reset responseData on error
    }
  };

  return { mutate: fn, ...state };
};

export default useMutation;
