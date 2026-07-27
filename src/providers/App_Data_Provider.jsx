import { useEffect } from "react";
import { useGetStaffLoginData } from "../API/base-api";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarLoader from "../components/core/loaders/StarLoader";
import useCurrentUser from "../hooks/useCurrentUser";

// eslint-disable-next-line react/prop-types
const App_Data_Provider = ({ children }) => {
  const { mutateAsync, data, isPending, isError } = useGetStaffLoginData();

  const { setCurrentUser } = useCurrentUser();

  const [searchParam] = useSearchParams();
  const token = searchParam.get("ctx");
  const company_id = searchParam.get("cid");
  const staff_id = searchParam.get("stid");
  const app_switcher = searchParam.get("from");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await mutateAsync({
          company_id,
          staff_id,
          token,
        });

        const reformedData = {
          data: resData?.data?.data,
          token: token,
          status: resData?.data?.status,
        };
        console.log(reformedData, ":reformed data");
        setCurrentUser(reformedData);
        navigate("/people/self/profile?tab=profile");
      } catch (err) {
        console.log(err);
      }
    };
    if (app_switcher === "basement" && token) {
      fetchData();
    }
  }, [
    app_switcher,
    company_id,
    mutateAsync,
    navigate,
    setCurrentUser,
    staff_id,
    token,
  ]);

  if (isPending) {
    return (
      <main className="h-screen flex items-center justify-center">
        <StarLoader size={32} />
      </main>
    );
  }

  if (isError && app_switcher === "basement" && token) {
    return (
      <main className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 max-w-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading your data. Please try again or
            contact support if the problem persists.
          </p>
          <button
            onClick={() => window.close()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Return to Main App
          </button>
        </div>
      </main>
    );
  }
  // Only render children if validation was successful

  if (app_switcher === "basement" && token) {
    if (data?.data) {
      return <>{children}</>;
    } else {
      return;
    }
  } else {
    return <>{children}</>;
  }
};

export default App_Data_Provider;
