/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { Typography } from "antd";
import { LucideRefreshCcwDot } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ImageCamera = ({refresh}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  }, []);

  const captureImage = () => {
    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;

    if (canvasElement && videoElement) {
      // Set canvas dimensions to match the video element
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      // Draw video frame onto the canvas
      const context = canvasElement.getContext("2d");
      context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // Convert canvas image to data URL
      const imageDataURL = canvasElement.toDataURL("image/png");
      setCapturedImage(imageDataURL);
    }
  };

  const saveImage = () => {
    const date = new Date();

    if (capturedImage) {
      // Create a temporary anchor element
      const anchor = document.createElement("a");
      anchor.href = capturedImage;
      anchor.download = `captured_image_${date.toLocaleTimeString()}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    restart();
  };

  const restart = () => {
    setCapturedImage(null);
    refresh()
  };

//   const refresh = () => {
//     // window.location.reload();
//     setRefreshKey((prevKey) => prevKey + 1);
//   };

  return (
    <div className="absolute top-0 right-0  bg-white border rounded-lg p-2">
      <div className="w-full flex flex-col bg-purple-100  py-3">
        <div className="flex justify-between gap-2 items-center p-1">
          <Typography
            variant="h5"
            className="px-2 uppercase font-Exo font-bold"
          >
            Capture Image
          </Typography>

          <div className="flex  items-start">
            <div
              className="p-1 h-fit rounded-full cursor-pointer lightbtn-md  z-10 group hover:shadow"
              onClick={refresh}
            >
                  <LucideRefreshCcwDot
                    className=" z-20 p-[0.1rem]   text-gray-500"
                    size={15}
                    />
            </div>
          </div>
        </div>

        {capturedImage ? (
          <img src={capturedImage} alt="Captured" />
        ) : (
          <video
            muted
            playsInline
            ref={videoRef}
            autoPlay={true}
            className=""
          />
        )}

        <div className="flex gap-3 p-2 justify-end">
          {!capturedImage ? (
            <Button onClick={captureImage}>Capture Image</Button>
          ) : (
            <Button variant="light" color="danger" onClick={restart}>
              Cancel
            </Button>
          )}

          {capturedImage && (
            <Button
              onClick={saveImage}
              color="success"
              disabled={!capturedImage}
            >
              Save Image
            </Button>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};


export default ImageCamera;
