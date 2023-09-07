import { useState, useEffect } from "react";

const ScreenRec = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [blobs, setBlobs] = useState([]);
  const [videoLocal, setVideoLocal] = useState([]);

  const screenAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSorces: screen },
        audio: true,
      });

      const recorder = new MediaRecorder(stream.getTracks());
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setBlobs((blobs) => [...blobs, e.data]);
        }
      };
      recorder.onstop = () => {
        const videoBlob = new Blob(blobs, { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoLocal((videos) => [...videos, videoURL]);
        localStorage.setItem(
          "screenRecoding",
          JSON.stringify([...videoLocal, videoURL])
        );
      };

      recorder.start(100);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };
  useEffect(() => {
    const recordedVideoURLs =
      JSON.parse(localStorage.getItem("screenRecoding")) || [];

    setVideoLocal(recordedVideoURLs);
  }, []);

  return (
    <main className="screen">
      <div>
        <div>
          <div>
            <button onClick={screenAccess}>Start recording</button>

            <button onClick={stopRecording}>Stop Recording</button>
          </div>
          <p>Screen Recorder </p>
        </div>
        <aside>
          {videoLocal
            .map((videoURL, index) => (
              <div key={index}>
                <video controls src={videoURL} />
              </div>
            ))
            .reverse()}
        </aside>
      </div>
    </main>
  );
};

export default ScreenRec;
