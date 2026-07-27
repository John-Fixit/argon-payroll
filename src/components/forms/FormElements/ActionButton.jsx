/* eslint-disable react/prop-types */
export default function ActionButton({className, children, ...rest}){
    return(
        <>
            <button className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[3px] leading-[19.5px mx-2 my-1 text-[0.6125rem] md:my-0 px-[12px] uppercase ${className}`}
            {...rest}
            >
                        {children}
                    </button>
        </>
    )
}