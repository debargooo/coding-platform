import axios from "axios";
import { LANGUAGE_VERSIONS } from "../../Components/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode,input = "") => {
    try {
      const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin: input,
      });
      return response.data;  // Ensure you return the full response, including output
    } catch (error) {
      console.error("Error in executing code:", error);
      throw error;  // Propagate the error
    }
  };
  