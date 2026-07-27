import { useCallback, useEffect, useRef } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { errorToast } from "../../utils/toastMsgPop";

const AppSwitcher = () => {
  const switcherRef = useRef(null);
  const scriptRef = useRef(null);

  const { userData } = useCurrentUser();

  const initializeSwitcher = useCallback(() => {
    if (!window.ArgonAppSwitcher) {
      return;
    }

    window.ArgonAppSwitcher.init({
      containerId: "react-app-switcher",
      apiBaseUrl: "https://hr.ncaa.gov.ng/old_hr/apis",
      authToken: userData?.token,
      companyId: userData?.data?.COMPANY_ID,
      staffId: userData?.data?.STAFF_ID,
      staffPermissions: userData?.data,
      title: "Argon Apps",
      onError: (msg) => errorToast(msg),
    });
  }, [userData?.data, userData?.token]);

  useEffect(() => {
    // Check if already loaded
    if (window.ArgonAppSwitcher) {
      initializeSwitcher();
      return;
    }

    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "https://app-switcher.netlify.app/argon-app-switcher.iife.js";
    script.async = true;
    scriptRef.current = script;

    script.onload = () => {
      initializeSwitcher();
    };

    script.onerror = () => {
      console.error("Failed to load ArgonAppSwitcher script");
    };

    document.body.appendChild(script);

    return () => {
      if (window.ArgonAppSwitcher) {
        window.ArgonAppSwitcher.destroy("react-app-switcher");
      }
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [initializeSwitcher]);

  return <div className="z-80" id="react-app-switcher" ref={switcherRef}></div>;
};

export default AppSwitcher;
