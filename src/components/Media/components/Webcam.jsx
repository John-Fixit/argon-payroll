/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { Typography } from "antd";
import { LucideRefreshCcwDot } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { IoRemove } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const Webcam = ({refresh, save, onSubmit, onClose}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  // const trackRef = useRef(null)



  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageBlob, setCapturedImageBlob] = useState(null);
  // const [trackRef, settrackRef] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
//   const [refreshKey, setRefreshKey] = useState(0);



  useEffect(() => {

    setIsMounted(true);


    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const getData = ()=>{
      if (videoElement && canvasElement) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mstream) => {
              videoElement.srcObject = mstream;
              streamRef.current = mstream;
      
              // console.log('here')
            })
            .catch((error) => {
              console.error("Error accessing media devices:", error);
            });
      }

    }

    if(isMounted){
      getData()
    }

    return () => {
      // Cleanup function to stop the stream tracks when the component unmounts
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
        // this.webcam.video.srcObject = null;
      }
    };


  }, [isMounted]);



  const offMedia = ()=>{
    onClose()
  }


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

      // // Convert canvas image to data URL
      // const imageDataURL = canvasElement.toDataURL("image/png");
      // setCapturedImage(imageDataURL);

      // in base64
      // captureImageInBase64Mode(canvasElement)

      // in blob mode
      captureImageInBlobMode(canvasElement)
    }
  };



  const captureImageInBase64Mode = (canvasElement)=>{
          // Convert canvas image to data URL
          const imageDataURL = canvasElement.toDataURL("image/png");
          setCapturedImage(imageDataURL);
  }

// currently using the blob mode
  const captureImageInBlobMode = (canvasElement)=>{
    canvasElement.toBlob(blob => {
      const imageDataURL = URL.createObjectURL(blob);
      setCapturedImage(imageDataURL); // browser blend mode of the image
      setCapturedImageBlob(blob) //file mode of the image
      }, 'image/png');
    }
  

  
  // const downloadImageInBlobMode = (canvasElement)=>{
  //   canvasElement.toBlob(blob => {
  //       // Create a temporary link element
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'captured_image.png';
  //       // Programmatically click the link to trigger download
  //       link.click();
  //       // Cleanup
  //       URL.revokeObjectURL(link.href);
  //     }, 'image/png');
  //   }





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
  const closeDown = () => {
    setCapturedImage(null);
    offMedia()
  };


  const submit = ()=>{
    onSubmit(capturedImageBlob)
    offMedia()
  }
  
    if (!isMounted) {
      return null;
    } 


  return (
    <div className="absolute top-1 right-1  bg-white border rounded-lg p-2 z-[2]">
      <div className="w-full flex flex-col bg-purple-100  py-3">
        <div className="flex justify-between gap-2 items-center p-1">
          <Typography
            variant="h5"
            className="px-2 uppercase font-Exo font-bold"
          >
            Capture Image
          </Typography>

          <div className="flex  items-start gap-2">
            <div
              className="p-1 h-fit rounded-full cursor-pointer lightbtn-md  z-10 group hover:shadow"
              onClick={refresh}
            >
                  <LucideRefreshCcwDot
                    className=" z-20 p-[0.1rem]   text-gray-500"
                    size={15}
                    />
                 
            </div>
            <div
              className="p-1 h-fit rounded-full cursor-pointer lightbtn-md  z-10 group hover:shadow"
              onClick={closeDown}
            >
                  <MdCancel
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
            // height='80px'
            // className="h-[30rem]"
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

          {save && capturedImage && (
            <Button
              onClick={saveImage}
              color="success"
              disabled={!capturedImage}
            >
              Save Image
            </Button>
          )}

          { capturedImage && (
            <Button
              onClick={submit}
              color="success"
              disabled={!capturedImage}
            >
              Submit
            </Button>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};


export default Webcam;
