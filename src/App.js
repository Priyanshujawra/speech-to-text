import React, { useState } from "react";
import "./App.css"; // Create a separate CSS file for styling
import useClipboard from "react-use-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Home = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="home-container">
      <div className="content-container">
        <h1>Speech to Text Converter</h1>
        <p>This App helps you to convert speech from the microphone to text.</p>
      </div>
      <div className="input-container">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <textarea
          type=""
          value={transcript}
          onSelect={() => setTextToCopy(transcript)}
        />
        <div>
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
