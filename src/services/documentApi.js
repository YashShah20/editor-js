import api from "./api";

export default {
  saveToDocx(fileName, content) {
    return api.post(`/save`, {
      fileName,
      content,
    });
  },
  downloadReport() {
    return api.post(`/report`);
  },
};
