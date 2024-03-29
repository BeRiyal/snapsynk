import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosClient = (projectId, moodboardId) => {
    const headers = {
        'x-project-id': projectId,
    };
console.log("in axios client project id", projectId);
console.log("in axios client moodboardId", moodboardId);
    // Add moodboardId to headers if provided
    if (moodboardId) {
        headers['x-moodboard-id'] = moodboardId;
    }

    return axios.create({
        baseURL,
        headers,
    });
};

export default axiosClient;
