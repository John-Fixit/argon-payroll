// import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import propTypes from "prop-types"

// const FaceDetector = ({ image }) => {
//   const { url, width, height } = image;
//   const [faces, setFaces] = useState([]);


//   const imgRef = useRef();
//   const canvasRef = useRef();

//   const handleImage = async () => {
//     const detections = await faceapi.detectAllFaces(
//       imgRef.current,
//       new faceapi.TinyFaceDetectorOptions() 
//     );
//     console.log(detections)
//     setFaces(detections.map((d) => Object.values(d.box)));
//   };

//   const enter = () => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = "yellow";
//     faces.map((face) => ctx.strokeRect(...face));
//   };

//   useEffect(() => {
//     const loadModels = () => {
//       Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//         faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//         faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//       ])
//         .then(handleImage)
//         .catch((e) => console.log(e));
//     };

//     imgRef.current && loadModels();
//   }, []);



//   return (
//     <div className="container">
//       <div className="flex items-center justify-center fixed top-14 -right-[19rem]" style={{ width, height }}>
//         <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
//         <canvas
//           onMouseEnter={enter}
//           ref={canvasRef}
//           width={width}
//           height={height}
//         />
//       </div>
//     </div>
//   );
// };

// FaceDetector.propTypes = {
//     image : propTypes.any
// }


// export default FaceDetector;
