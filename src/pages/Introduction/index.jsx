/* eslint-disable react/prop-types */
// 6-----------------------------------
import { useState } from 'react';
import { Badge, Button, Card, CardBody, Progress } from '@nextui-org/react';
import {
//   Globe2,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Menu,
} from 'lucide-react';
import './intro.css'
import HRDashboardHero from './components/Feature';
import HeroImage from "../../assets/images/intro_hero.png"
import MoreSection from './components/MoreSection';
import BusinessTools from './components/BusinessTools';

const HeroNotification = ({ avatar, message, className }) => (
  <div
//   absolute -left-16 bottom-1/4 bg-white p-4 rounded-xl shadow-lg animate-float-delayed
    className={`absolute z-40  hidden  bg-white rounded-lg shadow-xl p-3 sm:flex items-center gap-3 animate-float-delayed ${className}`}
  >
    <img src={avatar} alt="User avatar" className="w-8 h-8 rounded-full" />
    <span className="text-sm text-gray-700">{message}</span>
    <CheckCircle2 className="w-4 h-4 text-green-500" />
  </div>
); 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ['Product', 'Solutions', 'Resources', 'Pricing'];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className=" sm:max-w-[80vw]  mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-btnColor to-cyan-500 rounded-lg"></div>
          <span className="font-bold text-xl">Argon</span>
        </div>
        <nav className="hidden lg:flex gap-x-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button className="bg-gradient-to-r from-btnColor to-cyan-500 hover:from-btnColor hover:to-cyan-600">
            Request Demo <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="pt-32 pb-20 px-4 overflow-hidden relative">
    <div className="absolute inset-0 top-72 bg-gradient-to-b from-blue-50 to-white -z-10"></div>

    {/* Floating Notifications */}
    <HeroNotification
      avatar="src/assets/images/avatar2.jpg"
      message="Payroll processed successfully"
      className="left-20 md:top-72 top-0 "
    /> 
    <HeroNotification
      avatar="src/assets/images/avatar2.jpg"
      message="New employee onboarded"
      className="right-20 md:top-60 top-0"
    />

    <div className="container mx-auto max-w-7xl relative">
      {/* Progress Circle */}
      <div className="absolute -right-20 top-0 w-40 h-40 bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg animate-float hidden md:block">
        <div className="w-full h-full relative ">
          <Progress 
          classNames={{
            base:"base-classes",
            labelWrapper: "labelWrapper-classes",
            label: "label-classes",
            value: "value-classes",
            track: "track-classes",
            indicator: "bg-btnColor/60",
         }}
          
          
          value={37} size="lg" className="rounded-full"  />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">37%</div>
            <div className="text-xs text-gray-500">Completion</div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mb-16">
        {/* <Badge className="mb-6 px-6 py-2 text-sm" variant="flat">
          Trusted by 10,000+ companies worldwide
        </Badge> */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-btnColor to-gray-900">
          Simplify Your HR With an All-In-One Solution
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Schedule a call for a personalized demo, tailored to your business needs.
          Transform your HR operations today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-black/40 to-slate-600 text-white max-w-40"
          >
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="max-w-40">
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardBody>
                    <img src={HeroImage} alt="" />
            </CardBody>
        </Card>

        {/* Floating Elements */}
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 animate-float">
          <Users className="w-6 h-6 text-blue-500" />
        </div>
        <div className="absolute -right-8 top-1/3 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 animate-float-delayed">
          <Clock className="w-6 h-6 text-green-500" />
        </div>
      </div>
    </div>
  </section>
);

const FeaturesGrid = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Core HR & People Management',
      description:
        'Centralized employee database with smart automation for HR processes',
      color: 'text-blue-600',
      colorbg: 'bg-blue-100/50',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time & Attendance',
      description: 'Advanced time tracking with geofencing and mobile clock-in',
      color: 'text-green-600',
      colorbg: 'bg-green-100/50',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Payroll Management',
      description: 'Automated payroll with tax compliance and direct deposits',
      color: 'text-purple-600',
      colorbg: 'bg-purple-100/50',
    },
  ];

  return (
    <section className="py-20 bg-[#f1f1f1]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <Badge variant="solid" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">All HR Functions, Simplified</h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your workforce effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto gap-16 min-h-[400px] place-items-center">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg rounded-3xl border-none shadow-none transition-all duration-300 border-0 min-h-[400px] max-w-[400px] h-full">
              <div className="p-8 flex flex-col justify-between h-full">
                <div
                  className={`${feature.color} group-hover:scale-110 transition-transform duration-300 ${feature.colorbg} p-4 rounded-3xl max-w-max`}
                >
                  {feature.icon}
                </div>
                <div className='flex flex-col gap-10 my-5 '>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>

                </div>
                <Button variant="ghost" className="group-hover:translate-x-2 transition-transform duration-300 mt-auto rounded-3xl p-6 max-w-max">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobalPresence = () => {
  const locations = [
    { country: 'United States', users: '10,000+' },
    { country: 'United Kingdom', users: '5,000+' },
    { country: 'Nigeria', users: '3,000+' },
    { country: 'Kenya', users: '2,000+' },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              Global Reach
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Expand Across The Globe With Ease
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our global reach ensures your data and workflows comply with local regulations,
              allowing you to hire, optimize processes and scale across countries.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {locations.map((location) => (
                <Card key={location.country} className="border-0 bg-gray-50">
                  <CardBody className="p-4">
                    
                    <div className="font-medium">{location.country}</div>
                    <div className="text-sm text-gray-500">{location.users} users</div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="src/assets/images/globe.png"
              alt="World Map showing global presence"
              className="rounded-2xl h-[600px]"
            />
            {/* Optional: Animated location dots */}
          </div>
        </div>
      </div>
    </section>
  );
};




const FooterSection = ()=>{

  return (
    <footer className="py-6 bg-gray-100 text-center text-gray-600">
    <footer className="bg-gray-800 text-gray-200 pt-12 pb-6">
<div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8">
  {/* Brand & CTA */}
  <div className="md:col-span-2 text-start">
    <div className="text-2xl font-bold text-white mb-4 ">Argon</div>
    
    <div className="flex space-x-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Try for Free
      </button>
      <button className="bg-transparent border border-gray-500 text-gray-200 px-4 py-2 rounded hover:bg-gray-700 transition-colors">
        Login
      </button>
    </div>
  </div>
  {/* Product */}
  <div className='text-start'>
    <h4 className="font-semibold text-white mb-2">Product</h4>
    <ul className="text-gray-400 space-y-1 ">
      <li>Core HR</li>
      <li>Payroll</li>
      <li>Time & Attendance</li>
      <li>Recruit</li>
      <li>Shift & Rota</li>
    </ul>
  </div>
  {/* Resources */}
  <div className='text-start'>
    <h4 className="font-semibold text-white mb-2">Resources</h4>
    <ul className="text-gray-400 space-y-1">
      <li>Blog</li>
      <li>Glossary</li>
      <li>Events</li>
      <li>Webinars</li>
      <li>Partners</li>
    </ul>
  </div>
  {/* Company */}
  <div className='text-start'>
    <h4 className="font-semibold text-white mb-2">Company</h4>
    <ul className="text-gray-400 space-y-1">
      <li>About Us</li>
      <li>Careers</li>
      <li>Contact</li>
      <li>Press</li>
      <li>Privacy Policy</li>
    </ul>
  </div>
</div>
<div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
  &copy; {new Date().getFullYear()} AdvancedHR. All rights reserved.
</div>
</footer>
</footer>
  )
}



const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <HRDashboardHero/>
        <BusinessTools/>
        <FeaturesGrid />

        <div className='bg-[#011c39] w-full flex items-center justify-center  h-full'>
             <MoreSection/>  
        </div>
        <GlobalPresence />
  
      </main>
      <FooterSection/>
   
    </div>
  );
};

export default LandingPage;















































// 4---------------------------------------------------------------------
// import { CardBody, Card , Button} from '@nextui-org/react';
// import { Badge,  } from 'antd';
// import { Globe2, Users, Clock, BarChart3, Shield, MessageSquare } from 'lucide-react';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Navigation */}
//       <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
//             <span className="font-bold text-xl">SeamlessHR</span>
//           </div>
          
//           <div className="hidden md:flex items-center gap-8">
//             <a href="#" className="text-gray-600 hover:text-gray-900">Product</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Solutions</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <Button variant="outline">Log in</Button>
//             <Button>Request Demo</Button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="flex flex-col items-center text-center mb-12">
//             <Badge className="mb-4" variant="secondary">Trusted by 1000+ companies</Badge>
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
//               Simplify Your HR With an All-In-One Solution
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mb-8">
//               Empower your team with modern HR tools that streamline operations, enhance productivity, and boost employee satisfaction.
//             </p>
//             <div className="flex gap-4">
//               <Button size="lg">Start Free Trial</Button>
//               <Button size="lg" variant="outline">Schedule Demo</Button>
//             </div>
//           </div>

//           {/* Stats Dashboard Preview */}
//           <Card className="w-full bg-white/50 backdrop-blur-sm border shadow-lg">
//             <CardBody className="p-6">
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <div className="text-sm text-gray-600">Total Employees</div>
//                   <div className="text-2xl font-bold">1,234</div>
//                 </div>
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <div className="text-sm text-gray-600">Attendance Rate</div>
//                   <div className="text-2xl font-bold">98.5%</div>
//                 </div>
//                 <div className="p-4 bg-purple-50 rounded-lg">
//                   <div className="text-sm text-gray-600">Employee Satisfaction</div>
//                   <div className="text-2xl font-bold">4.8/5.0</div>
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto max-w-6xl px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold mb-4">All HR Functions, Simplified</h2>
//             <p className="text-gray-600">Everything you need to manage your workforce effectively</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Users className="w-6 h-6 text-blue-600" />,
//                 title: "Core HR",
//                 description: "Centralize employee data and streamline HR processes"
//               },
//               {
//                 icon: <Clock className="w-6 h-6 text-green-600" />,
//                 title: "Time & Attendance",
//                 description: "Track attendance and manage schedules effortlessly"
//               },
//               {
//                 icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
//                 title: "Performance",
//                 description: "Set goals and monitor employee performance"
//               },
//               {
//                 icon: <Shield className="w-6 h-6 text-red-600" />,
//                 title: "Payroll",
//                 description: "Automate payroll processing and compliance"
//               },
//               {
//                 icon: <Globe2 className="w-6 h-6 text-indigo-600" />,
//                 title: "Global HR",
//                 description: "Manage international workforce with ease"
//               },
//               {
//                 icon: <MessageSquare className="w-6 h-6 text-orange-600" />,
//                 title: "Employee Engagement",
//                 description: "Build a better workplace culture"
//               }
//             ].map((feature, index) => (
//               <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
//                 <CardBody className="p-6">
//                   <div className="mb-4">{feature.icon}</div>
//                   <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </CardBody>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Global Presence Section */}
//       <section className="py-20">
//         <div className="container mx-auto max-w-6xl px-4">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Expand Across The Globe With Ease</h2>
//               <p className="text-gray-600 mb-8">
//                 Our global reach ensures your data and workflows comply with local regulations,
//                 allowing you to hire, optimize processes and scale across countries.
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 {['United States', 'United Kingdom', 'Australia', 'Nigeria', 'Kenya', 'South Africa'].map((country) => (
//                   <Badge key={country} variant="secondary" className="text-sm">
//                     {country}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-gray-100 rounded-lg p-8">
//               {/* Placeholder for world map or global presence visualization */}
//               <div className="aspect-video bg-gray-200 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-900 text-white">
//         <div className="container mx-auto max-w-4xl px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Transform Your HR Operations?</h2>
//           <p className="text-gray-300 mb-8">
//             Join thousands of companies using our platform to streamline their HR processes
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
//               Start Free Trial
//             </Button>
//             <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
//               Schedule Demo
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
























































