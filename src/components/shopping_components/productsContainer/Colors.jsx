/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./colors.css";
import clsx from "clsx";
import PropTypes from "prop-types";


export default function Colors({handleColorChange}){
    const colors = [
        {color: "#FCE7CC", bg_color: "#F1E701"},
        {color: "#D9D9D9", bg_color: "#909090"},
        {color: "#D9E6FE", bg_color: "#3F83F8"},
        {color: "#FCD5D6", bg_color: "#EE2E31"},
        {color: "#CCEFDD", bg_color: "#00AF54"},
    ]

    return(
        <>
            <div className="colors">
                {
                    colors?.map((color, index)=>{
                        return(
                            <button
                className={`item p-2 ${index===0?'border':null} ${index % 2 ? "bg-to-t" : "bg-to-b"}`}
                style={{ color: color?.color, backgroundColor: color?.bg_color, borderColor: color?.bg_color }}
                key={index}
                onClick={() => handleColorChange(color?.bg_color)}
            >
                {color?.color}/{color?.bg_color}
            </button>
                        )
                    })
                }
                
            </div>
        </>
    )
}
Colors.propTypes = {
    handleColorChange: PropTypes.func,
  };