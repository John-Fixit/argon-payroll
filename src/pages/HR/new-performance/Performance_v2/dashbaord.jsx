
import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, UserCheck, Clock, Briefcase, Target, GraduationCap } from 'lucide-react';

const PerformanceDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');





   // Performance metrics over time
  const performanceMetrics = [
    { month: 'Jan', productivity: 78, quality: 82, goals: 75, efficiency: 80 },
    { month: 'Feb', productivity: 81, quality: 85, goals: 78, efficiency: 83 },
    { month: 'Mar', productivity: 85, quality: 88, goals: 82, efficiency: 86 },
    { month: 'Apr', productivity: 88, quality: 90, goals: 85, efficiency: 89 },
    { month: 'May', productivity: 86, quality: 89, goals: 88, efficiency: 87 },
    { month: 'Jun', productivity: 90, quality: 92, goals: 91, efficiency: 91 },
  ];

  // Performance score distribution
  const performanceScoreData = [
    { range: 'Exceptional (90-100)', count: 68 },
    { range: 'Excellent (80-89)', count: 125 },
    { range: 'Good (70-79)', count: 72 },
    { range: 'Satisfactory (60-69)', count: 18 },
    { range: 'Needs Improvement (<60)', count: 2 },
  ];

  // Employee headcount & turnover
  const headcountData = [
    { month: 'Jan', employees: 245, hires: 12, exits: 8, turnover: 3.3 },
    { month: 'Feb', employees: 249, hires: 8, exits: 4, turnover: 1.6 },
    { month: 'Mar', employees: 258, hires: 15, exits: 6, turnover: 2.3 },
    { month: 'Apr', employees: 267, hires: 11, exits: 2, turnover: 0.7 },
    { month: 'May', employees: 276, hires: 14, exits: 5, turnover: 1.8 },
    { month: 'Jun', employees: 285, hires: 10, exits: 1, turnover: 0.4 },
  ];

  // Attendance distribution
  const attendanceData = [
    { range: '95-100%', count: 185 },
    { range: '90-95%', count: 62 },
    { range: '85-90%', count: 28 },
    { range: '80-85%', count: 8 },
    { range: 'Below 80%', count: 2 },
  ];

  // Performance ratings by department
  const performanceData = [
    { department: 'Engineering', excellent: 45, good: 32, average: 8, poor: 2 },
    { department: 'Sales', excellent: 38, good: 28, average: 12, poor: 5 },
    { department: 'Marketing', excellent: 22, good: 18, average: 6, poor: 1 },
    { department: 'Operations', excellent: 28, good: 24, average: 10, poor: 3 },
    { department: 'Finance', excellent: 18, good: 15, average: 4, poor: 1 },
  ];

  // Department distribution
  const departmentData = [
    { name: 'Engineering', value: 87, color: '#3b82f6' },
    { name: 'Sales', value: 83, color: '#10b981' },
    { name: 'Marketing', value: 47, color: '#f59e0b' },
    { name: 'Operations', value: 65, color: '#8b5cf6' },
    { name: 'Finance', value: 38, color: '#ec4899' },
  ];

  // Employee satisfaction metrics
  const satisfactionData = [
    { metric: 'Work-Life Balance', value: 82, fullMark: 100 },
    { metric: 'Compensation', value: 75, fullMark: 100 },
    { metric: 'Career Growth', value: 78, fullMark: 100 },
    { metric: 'Management', value: 85, fullMark: 100 },
    { metric: 'Work Environment', value: 88, fullMark: 100 },
    { metric: 'Team Collaboration', value: 90, fullMark: 100 },
  ];

  // Training completion rates
  const trainingData = [
    { program: 'Safety Training', completion: 98, inProgress: 2, notStarted: 0 },
    { program: 'Leadership Dev', completion: 65, inProgress: 25, notStarted: 10 },
    { program: 'Tech Skills', completion: 72, inProgress: 18, notStarted: 10 },
    { program: 'Compliance', completion: 95, inProgress: 3, notStarted: 2 },
    { program: 'Soft Skills', completion: 58, inProgress: 30, notStarted: 12 },
  ];

  // Recruitment pipeline
  const recruitmentData = [
    { week: 'Week 1', applications: 145, screenings: 68, interviews: 32, offers: 8 },
    { week: 'Week 2', applications: 178, screenings: 82, interviews: 45, offers: 12 },
    { week: 'Week 3', applications: 156, screenings: 75, interviews: 38, offers: 10 },
    { week: 'Week 4', applications: 192, screenings: 95, interviews: 52, offers: 15 },
    { week: 'Week 5', applications: 168, screenings: 88, interviews: 48, offers: 14 },
    { week: 'Week 6', applications: 185, screenings: 92, interviews: 55, offers: 16 },
  ];

  // Leave utilization
  const leaveData = [
    { month: 'Jan', sick: 42, vacation: 28, personal: 15 },
    { month: 'Feb', sick: 38, vacation: 35, personal: 12 },
    { month: 'Mar', sick: 45, vacation: 48, personal: 18 },
    { month: 'Apr', sick: 35, vacation: 62, personal: 22 },
    { month: 'May', sick: 40, vacation: 75, personal: 25 },
    { month: 'Jun', sick: 32, vacation: 85, personal: 20 },
    { month: 'Jul', sick: 38, vacation: 95, personal: 28 },
    { month: 'Aug', sick: 42, vacation: 88, personal: 24 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive HR metrics and workforce insights</p>
          </div>
          <div className="flex gap-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >

      
        {/* Performance Metrics Over Time */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Performance Metrics Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceMetrics}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="productivity" stroke="#3b82f6" fillOpacity={1} fill="url(#productivityGradient)" name="Productivity Score" />
              <Area type="monotone" dataKey="quality" stroke="#10b981" fillOpacity={1} fill="url(#qualityGradient)" name="Quality Score" />
              <Area type="monotone" dataKey="goals" stroke="#f59e0b" fillOpacity={1} name="Goal Achievement" />
              <Area type="monotone" dataKey="efficiency" stroke="#8b5cf6" fillOpacity={1} name="Efficiency Rating" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Score Distribution */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Performance Score Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>



















        {/* Headcount & Turnover */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Headcount & Turnover</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={headcountData}>
              <defs>
                <linearGradient id="employeesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="turnoverGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="employees" stroke="#3b82f6" fillOpacity={1} fill="url(#employeesGradient)" name="Total Employees" />
              <Area type="monotone" dataKey="turnover" stroke="#ef4444" fillOpacity={1} fill="url(#turnoverGradient)" name="Turnover %" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Distribution */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Attendance Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recruitment Pipeline */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Recruitment Pipeline</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recruitmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} name="Applications" dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="interviews" stroke="#f59e0b" strokeWidth={3} name="Interviews" dot={{ fill: '#f59e0b' }} />
              <Line type="monotone" dataKey="offers" stroke="#10b981" strokeWidth={3} name="Offers" dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Department Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Employee Satisfaction */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-yellow-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Employee Satisfaction</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={satisfactionData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Training Completion */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-indigo-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Training Completion Rates</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="program" type="category" stroke="#6b7280" width={120} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="completion" fill="#10b981" name="Completed %" radius={[0, 4, 4, 0]} />
              <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress %" radius={[0, 4, 4, 0]} />
              <Bar dataKey="notStarted" fill="#ef4444" name="Not Started %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Ratings by Department */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-cyan-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Performance Ratings by Department</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="excellent" stackId="a" fill="#10b981" name="Excellent" radius={[0, 0, 0, 0]} />
              <Bar dataKey="good" stackId="a" fill="#3b82f6" name="Good" radius={[0, 0, 0, 0]} />
              <Bar dataKey="average" stackId="a" fill="#f59e0b" name="Average" radius={[0, 0, 0, 0]} />
              <Bar dataKey="poor" stackId="a" fill="#ef4444" name="Needs Improvement" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Leave Utilization */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-pink-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Leave Utilization Trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leaveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="sick" stroke="#ef4444" strokeWidth={3} name="Sick Leave" dot={{ fill: '#ef4444', r: 5 }} />
              <Line type="monotone" dataKey="vacation" stroke="#3b82f6" strokeWidth={3} name="Vacation" dot={{ fill: '#3b82f6', r: 5 }} />
              <Line type="monotone" dataKey="personal" stroke="#8b5cf6" strokeWidth={3} name="Personal" dot={{ fill: '#8b5cf6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PerformanceDashboard;