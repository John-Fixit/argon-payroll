import { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useCurrentUser from "./hooks/useCurrentUser";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile";
import Leave from "./pages/Leave/Leave";
import Login from "./pages/login/Login";
import Approval from "./pages/Approval/Approval";
import Performance from "./pages/Performance/Performance";
import PendingTraining from "./pages/Training/PendingTraining/PendingTraining";
import TrainingFee from "./pages/Training/TrainingFee/TrainingFee";
import ApprovedTraining from "./pages/Training/ApprovedTraining/ApprovedTraining";
import TrainingStatus from "./pages/Training/TrainingStatus/TrainingStatus";
import Attendance from "./pages/Attendance/Attendance";
import OnboardStaff from "./pages/HR/StaffManagement/OnboardStaff";
import LeaveRequest from "./pages/HR/Leave Management/LeaveRequest/LeaveRequest";
import StaffDetails from "./pages/HR/StaffManagement/StaffDetails";
import StaffExit from "./pages/HR/StaffManagement/Staff Exit";
import VariationPage from "./pages/HR/Variations/Create";
import HrTraining from "./pages/HR/Training";
import Industrail from "./pages/HR/Industrail";
import HRPromotions from "./pages/HR/Promotions";
import HRForms from "./pages/HR/HRForms";
import Deployment from "./pages/HR/Deployment";
import TrainingDashboard from "./pages/SelfService/Training/TrainingDashboard/TrainingDashboard";
import Announcement from "./pages/HR/Announcement";
import OurCourses from "./pages/Courses";
import HrPerformance from "./pages/HR/Performance";
import ApprovalHR from "./pages/HR/Approval/Approval";
import HrExit from "./pages/HR/hr-exit/HrExit";
import MemoDashboard from "./pages/home/Engage/memo/MemoDashboard";
// import MemoDashByJohn from './pages/home/Engage/memo/MemoDashByJohn'
import Expenses from "./pages/Expenses/Expenses";
import Exit from "./pages/Exit/Exit";
import Discipline from "./pages/Discipline/Descipline";
import Request from "./pages/SelfService/Request";
import Organization from "./pages/Organization/Organization";
import Organogram from "./pages/Organization/Organogram";
import Hospital from "./pages/Hospital/Hospital";
import GlobalProviders from "./components/core/GlobalProvider";
import Administrator from "./pages/HR/StaffManagement/Administrator/Administrator";
import Reports from "./pages/Reports/Reports";
import AttendanceAdmin from "./pages/Attendance/AttendanceAdmin";
import SalaryAdvance from "./pages/SalaryAdvance/SalaryAdvance";
import ProfileDetails from "./pages/ProfileInformation/ProfileDetails";
import { FloatingChat } from "./components/core/shared/FloatingChat";
import SessionTimeout from "./components/core/shared/ActivityLogger";
import RouteGuard from "./layouts/RouteGuard";
import ApprasealForm from "./components/self_services/aper/ApprasealForm";
import Variations from "./pages/Variation";
import Allowances from "./pages/payroll/Setting/Allowances/Allowances";
import StaffDetailRecord from "./pages/payroll/StaffInformation/StaffRecord/StaffDetailRecord";
import SuspendStaff from "./pages/payroll/StaffInformation/SuspendStaff/SuspendStaff";
// import PayrollDashboard from "./pages/payroll/PayrollDashboard/PayrollDashboard";
import PayrollDashboard from "./pages/payroll/PayrollDashboard";
import Suspended_ExitedStaff from "./pages/payroll/Suspended_ExitedStaff";
// import PayRun from "./pages/payroll/pay_run/PayRun";
import PayrollSalaryVariation from "./pages/payroll/variations/PayrollSalaryVariation";
import AuditVariation from "./pages/Audit/variation/AuditVariation";
import Allstaff from "./pages/payroll/staff/Allstaff";
import NonMember from "./pages/payroll/staff/NonMember";
import AwaitingPayrollStaff from "./pages/payroll/staff/Awaiting";
import Suspension from "./pages/payroll/staff/Suspension";
import UserSalary from "./pages/payroll/user/Salary";
import Loans from "./pages/payroll/Payroll/Loans/Loans";
import Contribution from "./pages/payroll/Payroll/Contribution/Contribution";
import Cooperative from "./pages/payroll/Payroll/Cooperative/Cooperative";
import ThirteenthMonth from "./pages/payroll/13th";
import PayRunView from "./pages/payroll/payrun";
import ReportWizard from "./pages/payroll/Report/Report_Wizard";
import Recalculate from "./pages/payroll/Payroll/Recalculate/Recalculate";
import PerformanceTemplate from "./pages/HR/new-performance/Performance_v2/template";
import PerformanceCycle from "./pages/HR/new-performance/Performance_v2/cycle";
import Forms_Survey from "./pages/forms-survey/Forms_Survey";
// import AdsPopup440 from "./pages/home/rightBar/components/AdsPopup440";

const App = () => {
  const { userData } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to handle keyboard events
    function handleKeyDown(event) {
      const key = event.key;
      const delta = 100; // You can adjust the scroll speed as needed

      if (key === "ArrowUp") {
        window.scrollBy(0, -delta); // Scroll up
      } else if (key === "ArrowDown") {
        window.scrollBy(0, delta); // Scroll down
      }
    }
    // Add event listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!userData && !location.pathname.includes("introduction")) {
      navigate("/login");
    }
  }, [userData, navigate, location.pathname]);

  const seekSite = (link) => {
    window.open(link, "_self");
  };

  useEffect(() => {
    const baseUrl = window.location.origin;
    const path = location.pathname;

    if (baseUrl?.includes("https://communeety-hr.netlify.app")) {
      if (path !== "/people/self/attendance/") {
        // seekSite('http://localhost:5173' + path)
        seekSite("http://hrnew.africacodes.net" + path);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<RouteGuard element={<RootLayout />} />}>
          {/* MESSAGING APPS */}
          {/* DEFAULT APPS */}
          {/* <Route path="" element={<Navigate to="/engage/home" />} /> OLD */}
          <Route path="" element={<Navigate to="/payroll/staff/all" />} />
          <Route path="/engage/home" element={<Home />} />
          {/* DEFAULT APPS */}
          {/* MESSAGING APPS */}

          {/* COURSES APPS */}
          {/* PEOPLE APP */}
          <Route path="people/learning/courses" element={<OurCourses />} />
          {/* PEOPLE APP */}
          {/* COURSES APPS */}

          {/* ORGANIZATION APPS */}
          {/* PEOPLE APP */}
          <Route path="/people/organogram" element={<Organogram />} />
          <Route path="/people/organization" element={<Organization />} />

          {/* PEOPLE APP */}
          {/* ORGANIZATION APPS */}

          {/* SELF SERVICE APPS */}
          {/* PEOPLE APP */}
          <Route path="people/self/requests" element={<Request />} />
          <Route path="people/self/performance" element={<Performance />} />
          <Route path="people/self/profile" element={<Profile />} />
          <Route
            path="people/self/profile_details/:staff_id"
            element={<ProfileDetails />}
          />

          <Route path="people/self/leave" element={<Leave />} />
          <Route path="people/self/approvals" element={<Approval />} />
          <Route path="people/self/attendance" element={<Attendance />} />
          <Route path="people/self/hospital" element={<Hospital />} />
          <Route path="people/self/expenses" element={<Expenses />} />
          <Route path="people/self/exit" element={<Exit />} />
          <Route
            path="people/self/salary-advance"
            element={<SalaryAdvance />}
          />
          <Route path="people/self/variation" element={<Variations />} />
          <Route path="people/self/appraise" element={<ApprasealForm />} />
          <Route path="people/self/forms_survey" element={<Forms_Survey />} />

          <Route path="people/self/training" element={<Outlet />}>
            <Route path="" element={<TrainingDashboard />} />
            <Route
              path="people/self/pending_training"
              element={<PendingTraining />}
            />
            <Route path="people/self/training_fees" element={<TrainingFee />} />
            <Route
              path="people/self/approved_training"
              element={<ApprovedTraining />}
            />
            <Route
              path="people/self/training_status"
              element={<TrainingStatus />}
            />
          </Route>
          {/* PEOPLE APP */}
          {/* SELF SERVICE APPS */}

          <Route path="payroll/" element={<Outlet />}>
            <Route path="dashboard" element={<PayrollDashboard />} />
            <Route
              path="salary_variation"
              element={<PayrollSalaryVariation />}
            />
            <Route path="loan" element={<Loans />} />
            <Route path="cooperative" element={<Cooperative />} />
            <Route path="allowance/recalculate" element={<Recalculate />} />
            <Route path="contribution" element={<Contribution />} />
            <Route path="settings/allowances" element={<Allowances />} />
            <Route path="payrun" element={<PayRunView />} />
            <Route path="staff_detail" element={<StaffDetailRecord />} />
            <Route path="suspend_staff" element={<SuspendStaff />} />

            <Route
              path="suspend_exit_staff"
              element={<Suspended_ExitedStaff />}
            />

            <Route path="staff/all" element={<Allstaff />} />
            <Route path="staff/non_membership" element={<NonMember />} />
            <Route path="staff/suspension" element={<Suspension />} />
            <Route path="staff/awaiting" element={<AwaitingPayrollStaff />} />
            <Route path="user/payslip" element={<UserSalary />} />

            <Route path="13thmonth" element={<ThirteenthMonth />} />
            <Route path="payrun" element={<PayRunView />} />

            <Route path="report" element={<ReportWizard />} />
          </Route>

          {/* HRIM APPS */}
          {/* PEOPLE APP */}
          <Route path="/people/self/onboard" element={<OnboardStaff />} />
          <Route path="/people/hr/report" element={<Reports />} />
          <Route path="people/hr/memos" element={<MemoDashboard />} />
          {/* <Route path='people/hr/memos' element={<MemoDashByJohn />} /> */}

          <Route path="/people/hr/exit" element={<StaffExit />} />
          <Route path="/people/hr/training" element={<HrTraining />} />
          <Route path="/people/hr/promotions" element={<HRPromotions />} />
          <Route path="/people/hr/transfer" element={<Deployment />} />
          <Route path="/people/hr/leave" element={<LeaveRequest />} />
          <Route path="/people/hr/variation" element={<VariationPage />} />
          <Route path="/people/hr/variation" element={<VariationPage />} />
          <Route path="/people/hr/performance" element={<HrPerformance />} />
          <Route path="/people/hr/exit-request" element={<HrExit />} />

          <Route
            path="/people/admin/administrator"
            element={<Administrator />}
          />
          <Route path="/people/hr/performance" element={<HrPerformance />} />
          <Route path="/people/hr/attendance" element={<AttendanceAdmin />} />
          <Route path="/people/hr/announcement" element={<Announcement />} />
          <Route path="/people/hr/discipline" element={<Discipline />} />

          <Route path="/people/hr/industial" element={<Industrail />} />
          <Route path="/people/hr/hrforms" element={<HRForms />} />

          <Route path="/people/hr/approvals" element={<ApprovalHR />} />
          <Route path="/people/hr/exits" element={<HrExit />} />

          {/* Approval flow ROUTES */}
          <Route
            path="/people/hr/approval-flow/template"
            element={<PerformanceTemplate />}
          />
          <Route
            path="/people/hr/approval-flow/cycle"
            element={<PerformanceCycle />}
          />

          {/* AUDIT ROUTES */}
          <Route path="/audit/variation" element={<AuditVariation />} />

          {/* PEOPLE APP */}
          {/* HRIM APPS */}

          <Route path="*" element={<div>page coming soon</div>} />
        </Route>
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>

      <SessionTimeout />
      <FloatingChat />
      {/* <AdsPopup440/> NOTE coming soon */}
      <GlobalProviders />
    </>
  );
};
export default App;
