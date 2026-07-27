import  { useState } from 'react';

const sections = [
  { id: 'hrms', label: 'HRMS' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'performance', label: 'Performance' },
  { id: 'recruitment', label: 'Recruitment' },
  { id: 'timeManagement', label: 'Time Management' },
  { id: 'employeeBenefits', label: 'Employee Benefits' }
];

// In a real application, you would replace these with actual dashboard images
const sectionImages = {
  hrms: "src/assets/images/intro_chat.png",
  payroll: "https://placehold.co/500x400",
  performance: "https://placehold.co/500x400", // Replace with your performance dashboard image
  recruitment: "https://placehold.co/500x400",
  timeManagement: "https://placehold.co/500x400",
  employeeBenefits: "https://placehold.co/500x400"
};

const HRDashboardHero = () => {
  const [activeSection, setActiveSection] = useState('performance');

  return (

    <div className='flex flex-col gap-10 items-center justify-center py-20'>
      <h1 className='text-4xl font-bold font-Helvetica'>All HR Functions, Simplified.</h1>
      <div className="bg-[#e4ecfa] p-8  w-[90%] sm:max-w-[70vw] min-h-[600px] mx-auto rounded-2xl shadow-lg ">
        <nav className="bg-white rounded-full shadow-sm p-1 max-w-4xl mx-auto mb-16">
          <ul className="flex justify-between items-center duration-500 transition-all overflow-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-hide w-full">
            {sections.map((section) => (
              <li key={section.id} className='w-full whitespace-nowrap '>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-2 rounded-full text-sm  duration-500 transition-all  ${
                    activeSection === section.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >

                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Navigation */}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center  justify-center place-content-center place-items-center  min-h-[400px]">
          {/* Left Column - Text Content */}
          <div className='order-2 md:order-1'>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Build and manage<br />high-performing teams.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Cultivate a culture of excellence. Choose your preferred framework, track progress, get two-way feedback and drive results with a comprehensive performance management software.
            </p>
            <button className="px-8 py-2 border-1 border-blue-900 rounded-full text-gray-900 hover:border-gray-300 transition-colors">
              Learn More
            </button>
          </div>

          {/* Right Column - Dashboard Image */}
          <div className="flex justify-end order-1 md:order-2">
            <div className="relative w-full max-w-md">
              {/* Optional loading state */}
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none">
                <div className="flex items-center justify-center h-full">
                  Loading...
                </div>
              </div>
              
              {/* Dashboard Image */}
              <img
                src={sectionImages[activeSection]}
                alt={`${activeSection} dashboard view`}
                className="w-full h-auto rounded-xl shadow-lg transition-all duration-300 max-h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboardHero;