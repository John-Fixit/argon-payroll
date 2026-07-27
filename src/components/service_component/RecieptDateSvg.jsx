import PropTypes from "prop-types";
export default function RecieptDateSvg({date}) {
  return (
    <>
    <div className="flex justify-center">
       <svg width="466" height="124" viewBox="0 0 466 124" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M68 24L1 53L14.5 66.5L68 24ZM68 24L42.25 86.25L26.5 76L68 24Z" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M14.75 66.25L66.75 25.25L26.5 75.75L17.5 91L14.75 66.25Z" fill="#BFD6FD" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M17.9199 91.25L26.4999 76L34.9999 81.5L17.9199 91.25Z" fill="#3F83F8" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M18 96.0922C22.8021 109.058 40.2575 130.595 74.5442 101.494M74.5442 101.494C78.5059 98.7933 84.2684 91.2301 82.1074 88.1688C78.7169 83.3654 72.3833 86.0078 74.5442 101.494ZM74.5442 101.494C80.9069 102.215 95.6492 105.672 103.717 113.74" stroke="#3F83F8" strokeDasharray="2.88 2.88"/>
<line x1="68" y1="23.5" x2="163" y2="23.5" stroke="#D9D9D9"/>
<rect x="165.5" y="0.5" width="136" height="45" rx="21.5" stroke="#909090"/>
<text fill="#909090" xmlSpace="preserve" fontFamily="Poppins" fontSize="12" letterSpacing="0em"><tspan x="185" y="27.2">{date??"Aug 3rd, 7:38 PM"}</tspan></text>
<path d="M436 25L369 54L382.5 67.5L436 25ZM436 25L410.25 87.25L394.5 77L436 25Z" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M382.75 67.25L434.75 26.25L394.5 76.75L385.5 92L382.75 67.25Z" fill="#BFD6FD" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M385.92 92.25L394.5 77L403 82.5L385.92 92.25Z" fill="#3F83F8" stroke="#3F83F8" strokeWidth="0.5"/>
<path d="M386 98.0922C390.802 111.058 408.258 132.595 442.544 103.494M442.544 103.494C446.506 100.793 452.268 93.2301 450.107 90.1688C446.717 85.3654 440.383 88.0078 442.544 103.494ZM442.544 103.494C448.907 104.215 456.933 109.933 465 118" stroke="#3F83F8" strokeDasharray="2.88 2.88"/>
<line x1="303.002" y1="24.5" x2="435.003" y2="25" stroke="#D9D9D9"/>
</svg>
</div>
    </>
  )
}
RecieptDateSvg.propTypes = {
    date: PropTypes.string
}
