import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetReportingOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_reporting_officer"],
    queryFn: async () => {
      const res = await API.post(`performance/get_reporting_officer`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetCounterOfficer = (payload) => {
  return useQuery({
    queryKey: ["get_counter_officer"],
    queryFn: async () => {
      const res = await API.post(
        `performance/get_counter_signing_officer`,
        payload,
      );
      return res?.data?.data;
    },
  });
};

export const useGetActivePerformance = (company_id) => {
  return useQuery({
    queryKey: ["get_active_performance"],
    queryFn: async () => {
      const res = await API.get(
        `performance/get_active_performance_year/${company_id}`,
      );
      return res?.data?.data;
    },
  });
};
export const useGetMyAper = (payload) => {
  return useQuery({
    queryKey: [`my_${payload?.status}_aper`, payload],
    queryFn: async () => {
      const res = await API.post(`performance/list_aper`, payload);
      return res?.data?.data;
    },
  });
};

export const useCreateAper = (updateDraft) => {
  const queryClient = useQueryClient();
  const createAper = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      return await API.post(
        updateDraft
          ? "performance/update_aper_draft"
          : "performance/create_aper",
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    },
  });

  return createAper;
};
export const useUpdateAper = (updateDraft) => {
  const queryClient = useQueryClient();
  const updateAper = useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        updateDraft
          ? "performance/update_aper_draft"
          : "performance/create_aper",
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("my_draft_aper");
      queryClient.invalidateQueries("my_pending_aper");
      queryClient.invalidateQueries("my_completed_aper");
    },
  });

  return updateAper;
};

export const useAdminListAper = (payload) => {
  return useQuery({
    queryKey: [`list_${payload?.status}_${payload?.year}_aper`],
    queryFn: async () => {
      const res = await API.post(`performance/admin_list_aper`, payload);
      return res?.data?.data;
    },
  });
};

export const useDeleteAper = (selectedYear) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("/performance/admin_delete_aper", {
        request_id: payload?.request_id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`list_pending_${selectedYear}_aper`);
      queryClient.invalidateQueries(`list_draft_${selectedYear}_aper`);
    },
  });
};

//new performance
export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/create_template", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_list_template");
    },
  });
};
export const useEditTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/edit_template", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_list_template");
    },
  });
};
export const useCreateCycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/create_cycle", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get_cycle_list");
    },
  });
};

export const useGetListTemplate = ({ company_id }) => {
  return useQuery({
    queryKey: ["get_list_template"],
    queryFn: async () => {
      const res = await API.post("forms/list_templates", {
        company_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleList = ({ company_id }) => {
  return useQuery({
    queryKey: ["get_cycle_list"],
    queryFn: async () => {
      const res = await API.post("forms/list_cycles", {
        company_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetAwaitingPerformance = ({ company_id, staff_id, status }) => {
  return useQuery({
    queryKey: [`list_awaiting_performances_${status}`],
    queryFn: async () => {
      const res = await API.post(`forms/list_${status}_performances`, {
        company_id,
        staff_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetTemplateDetail = ({ template_id }) => {
  return useQuery({
    queryKey: [
      `get_template_detail_${template_id}_${new Date().toDateString()}`,
    ],
    queryFn: async () => {
      const res = await API.post("forms/view_template", {
        template_id,
      });
      return res?.data?.data;
    },
  });
};

export const useGetTemplateRecipient = ({
  company_id = "",
  recipient_type = "",
}) => {
  return useQuery({
    queryKey: [`get_template_recipient_${company_id}_${recipient_type}`],
    queryFn: async () => {
      const res = await API.post("forms/get_recipient", {
        company_id,
        recipient_type,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleRecipient = ({ cycle_id = "" }) => {
  return useQuery({
    queryKey: [`get_cycle_recipient_${cycle_id}`],
    queryFn: async () => {
      const res = await API.post("forms/view_cycle_recipients", {
        cycle_id,
      });
      return res?.data?.data;
    },
  });
};
export const useGetCycleResponse = ({ cycle_id = "" }) => {
  return useQuery({
    queryKey: [`get_cycle_response_${cycle_id}`],
    queryFn: async () => {
      const res = await API.post("forms/view_cycle_responses", {
        cycle_id,
      });
      return res?.data?.data;
    },
  });
};

export const useSaveDraftForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/save_draft_performances", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("list_draft_performances");
    },
  });
};
export const useSubmitSurveyForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/submit_performances", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("list_pending_performances");
    },
  });
};

export const useGetStaffResponse = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("forms/view_staff_cycle_responses", payload);
    },
  });
};
