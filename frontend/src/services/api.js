import REQUEST from "./Request";

export const register = async (userData) => {
  return await REQUEST({
    method: "POST",
    url: "/auth/register",
    data: userData,
  });
};

export const login = async (userData) => {
  return await REQUEST({
    method: "POST",
    url: "/auth/login/",
    data: userData,
  });
};
export const getNotes = async () => {
  return await REQUEST({
    method: "GET",
    url: "/api/notes",
  });
};
export const createNote = async (noteData) => {
  return await REQUEST({
    method: "POST",
    url: "/api/notes",
    data: noteData,
  });
};
export const updateNote = async (noteId, noteData) => {
  return await REQUEST({
    method: "PUT",
    url: "/api/notes/" + noteId,
    data: noteData,
  });
};
export const deleteNote = async (noteId) => {
  return await REQUEST({
    method: "DELETE",
    url: "/api/notes/" + noteId,
  });
};
export const saveRecording = async (noteId, recordingBlob) => {
  const formData = new FormData();
  formData.append("audio", recordingBlob, "recording.webm");
  return await REQUEST({
    method: "POST",
    url: `/api/record/${noteId}`,
    data: formData,
  });
};
export const getNoteAudios = async (noteId) => {
  return await REQUEST({
    method: "GET",
    url: `/api/notes/${noteId}/audios/`,
  });
};
