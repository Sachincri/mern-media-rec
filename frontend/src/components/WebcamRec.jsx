import { useState, useEffect, useRef } from "react";

function WebcamRec() {
  const [cameraStream, setCameraStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const videoRef = useRef(null);

  const startCamera = async () => {
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const startRecording = () => {
    let blobs = [];
    try {
      if (cameraStream) {
        const recorder = new MediaRecorder(cameraStream, {
          mimeType: "video/webm",
        });

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            blobs = [...blobs, e.data];
          }
        };

        recorder.onstop = () => {
          const videoBlob = new Blob(blobs, { type: "video/mp4" });
          const videoURL = URL.createObjectURL(videoBlob);
          setRecordedVideos((videos) => [...videos, videoURL]);
          localStorage.setItem(
            "recordedVideos",
            JSON.stringify([...recordedVideos, videoURL])
          );
        };

        recorder.start(100);
        setMediaRecorder(recorder);
      }
    } catch (error) {
      console.log(error, "error aya");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    const recordedVideoURLs =
      JSON.parse(localStorage.getItem("recordedVideos")) || [];
    setRecordedVideos(recordedVideoURLs);
  }, []);

  return (
    <main className="screen">
      <div>
        <div>
          <video
            ref={videoRef}
            type="video/webm"
            autoPlay
            width="1000"
            height="240"
          />

          <div>
            <button onClick={startCamera}>Start Camera</button>

            <button onClick={startRecording}>Start Recording</button>

            <button onClick={stopRecording}>Stop Recording</button>
          </div>
        </div>

        <aside>
          {recordedVideos
            .map((videoURL, index) => (
              <div key={index}>
                <video controls src={videoURL} width="1000" height="240" />
              </div>
            ))
            .reverse()}
        </aside>
      </div>
    </main>
  );
}

export default WebcamRec;
