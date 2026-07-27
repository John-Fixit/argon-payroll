import PropTypes from "prop-types";
import { useEffect } from "react";

const CircularLoader = ({ size, color="transparent" }) => {
    const loaderStyle = {
        border: "4px solid rgba(0, 0, 0, 0.1)",
        borderLeftColor: color ?? "transparent",
        borderRadius: "50%",
        width: `${size}px` ?? "36px",
        height: `${size}px` ?? "36px",
        animation: "spin89345 1s linear infinite",
    };

    const loaderAnimationKeyframes = `
        @keyframes spin89345 {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    useEffect(() => {
        // Create a style tag for keyframes
        const styleTag = document.createElement("style");
        styleTag.innerHTML = loaderAnimationKeyframes;
        document.head.appendChild(styleTag);

        // Cleanup function to remove the style tag when component unmounts
        return () => {
            document.head.removeChild(styleTag);
        };
    }, [loaderAnimationKeyframes]); // Empty dependency array to run once on mount

    return <div style={loaderStyle} />;
};

CircularLoader.propTypes = {
    size: PropTypes.number, // Updated to reflect correct types
    color:PropTypes.string
};

export default CircularLoader;
