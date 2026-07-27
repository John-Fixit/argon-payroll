import { useCallback, useMemo } from "react";
import { useGetExit } from "../../API/exit";
import useCurrentUser from "../../hooks/useCurrentUser";

const useExitData = (detailsStatus, setDetailsStatus) => {
  const { userData } = useCurrentUser();

  const { data: get_pending_request, isLoading: loading_1 } = useGetExit(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "pending_requests",
  );
  const { data: get_approved_request, isLoading: loading_2 } = useGetExit(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "approved_requests",
  );

  const { data: get_declined_request, isLoading: loading_3 } = useGetExit(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "declined_requests",
  );

  const formatResponseData = useCallback((queryResponse) => {
    return queryResponse ? queryResponse?.data : {};
  }, []);

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "1") {
      return formatResponseData(get_pending_request, "1")?.data;
    } else if (value == "2") {
      return formatResponseData(get_approved_request, "2")?.data;
    } else if (value == "3") {
      return formatResponseData(get_declined_request, "3")?.data;
    } else {
      return [];
    }
  };

  const tableData = useMemo(() => {
    return detailsStatus === "1"
      ? formatResponseData(get_pending_request, "1")?.data
      : detailsStatus === "2"
        ? formatResponseData(get_approved_request, "2")?.data
        : detailsStatus === "3"
          ? formatResponseData(get_declined_request, "3")?.data
          : null;
  }, [
    detailsStatus,
    formatResponseData,
    get_pending_request,
    get_approved_request,
    get_declined_request,
  ]);

  const isLoading = useMemo(() => {
    return loading_1 || loading_2 || loading_3;
  }, [loading_1, loading_2, loading_3]);

  const loadings = {
    1: loading_1,
    2: loading_2,
    3: loading_3,
  };

  return {
    selectTab,
    detailsNo,
    detailsStatus,
    tableData,
    isLoading,
    loadings,
  };
};

export default useExitData;
