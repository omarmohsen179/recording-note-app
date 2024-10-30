import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { saveRecording } from "../services/api";

function AudioRecorder({ noteId }) {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  const onStop = async (recordedBlob) => {
    try {
      await saveRecording(noteId, recordedBlob.blob);
      alert("Recording saved");
    } catch {
      alert("Failed to save recording");
    }
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        onStop={onStop}
        mimeType="audio/webm"
        strokeColor="#000000"
        backgroundColor="white"
      />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}

export default AudioRecorder;
