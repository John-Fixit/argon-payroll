import { Card } from "@nextui-org/react";
import { User, FileText, Clock, Search, MonitorPlay, Monitor, ClipboardList, Star, FileCheck, MessageSquare } from 'lucide-react';

const BusinessTools = () => {
  const tools = [
    { icon: <User size={16} className="text-blue-400"/>, title: 'Core HR', bg: 'bg-blue-100' },
    { icon: <FileText size={16}  className="text-pink-400" />, title: 'Payroll', bg: 'bg-pink-100' },
    { icon: <Clock size={16}  className="text-yellow-400" />, title: 'Time & Attendance', bg: 'bg-yellow-100' },
    { icon: <Search size={16}  className="text-orange-400" />, title: 'Recruit', bg: 'bg-orange-100' },
    { icon: <MonitorPlay size={16}  className="text-purple-400" />, title: 'Shift & Rota', bg: 'bg-purple-100' },
    { icon: <Monitor size={16}  className="text-green-400" />, title: 'Assets', bg: 'bg-green-100' },
    { icon: <ClipboardList size={16}  className="text-pink-400" />, title: 'BizEdge Task & Projects', bg: 'bg-pink-100' },
    { icon: <Star size={16}  className="text-purple-400" />, title: 'Performance', bg: 'bg-purple-100' },
    { icon: <FileCheck size={16}  className="text-gray-400" />, title: 'Referencing', bg: 'bg-gray-100' },
    { icon: <MessageSquare size={16}  className="text-blue-400" />, title: 'Chat', bg: 'bg-blue-100' },
    { icon: <User size={16}  className="text-gray-400" />, title: 'MyEdge', bg: 'bg-gray-100' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-normal text-gray-800 mb-4">Smart & Simple Tools.</h1>
        <p className="text-lg text-gray-600">
          All-in-one tool that redefines business management for you and your team
        </p>
      </div>

      <div className="flex flex-wrap max-w-6xl mx-auto justify-center items-center place-content-center gap-6 ">
        {tools.map((tool, index) => (
          <Card 
            key={index}
            className={`
             h-[105px] w-[140px] cursor-pointer shadow-sm rounded-lg hover:border`}
            radius="sm"
          >
            <div className={`flex flex-col justify-between items-start p-4 h-full ${tool.bg}`}>
              <div className="mb-2 bg-white rounded-md p-2">{tool.icon}</div>
              <h3 className="text-sm font-medium">{tool.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessTools;