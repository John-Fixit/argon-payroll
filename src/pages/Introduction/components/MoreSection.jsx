

const MoreSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-[#011c39]">
      {/* 
        Background is a subtle gradient from left (white) to right (#f9fbfe). 
        Adjust or remove if you want a solid color or different gradient.
      */}

      <div className="container mx-auto px-4">
        {/* 
          Wrapper for layering: 
          - We position two “cards” behind the main card using absolute + rotate. 
          - The main hero card is on top (z-10).
        */}
        <div className="relative max-w-5xl mx-auto items-center justify-center flex ">
          {/* Layered Card #1 (larger, behind) */}
          <div className="absolute -bottom-8   w-[80%] min-h-[500px] border border-[#244568] bg-[#0e345b]  rounded-[2rem] shadow-2xl" />

          {/* Layered Card #2 (slightly offset) */}
          <div className="absolute -bottom-4 w-[90%] min-h-[500px] bg-[#5f86ad]   rounded-[2rem] shadow-xl" />
      
          {/* <div className="absolute -bottom-8 -left-6 w-full min-h-[500px] bg-[#0e345b] opacity-60 rounded-[2rem] shadow-2xl rotate-3 " />
          <div className="absolute -bottom-10 -right-6 w-full min-h-[500px] bg-[#5f86ad] opacity-60  rounded-[2rem] shadow-xl rotate-[-2deg] " /> */}

          {/* Main Hero Card */}
          <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Simplify Your HR With an All-In-One HR Software.
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              Schedule a call for a personalised demo, tailored to your business needs.
            </p>
            <button className="inline-block px-6 py-3 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900 transition">
              Request a Demo
            </button>
          </div>

          {/* Floating Notification #1 */}
          <div className="absolute hidden top-20 -left-28 transform -translate-y-1/3 -translate-x-1/4 bg-white shadow-sm rounded-xl p-4 w-64 sm:flex flex-col gap-2 animate-float z-40">
            <span className="text-sm font-semibold">HR Approval Cycle</span>
            {/* Example of a small progress bar or gauge */}
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-full w-1/2 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* Floating Notification #2 */}
          <div className="absolute bottom-10 hidden -left-32 transform translate-y-1/2 -translate-x-1/6 bg-white shadow-sm rounded-xl p-4 w-64 sm:flex items-center gap-2 animate-float z-40">
            <div className="h-6 w-6 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-sm font-bold">
              ✓
            </div>
            <span className="text-sm">Payroll has been processed</span>
          </div>

          {/* Floating Notification #3 */}
          <div className="absolute top-0 -right-32 hidden sm:block transform -translate-y-1/4 translate-x-1/4 bg-white shadow-sm rounded-xl p-4 w-50 animate-float z-40 px-5">
          <div className="flex gap-2 items-center">
                <img
                    src="src/assets/images/avatar2.jpg"
                    alt="Candidate Avatar"
                    className="w-8 h-8 rounded-full"
                />
                <div className="items-center gap-1">
                    <span className="block text-sm font-semibold">
                    Candidate Interview
                    </span>
                    <span className="text-sm text-gray-500">
                        Catherine Mawata
                    </span>
                </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreSection;
