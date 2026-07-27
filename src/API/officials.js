import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetUnits = (payload) => {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      return await API.get(`package/get_units/${payload}`);
    },
  });
};
export const useGetDepartment = (payload) => {
  return useQuery({
    queryKey: ["dept"],
    queryFn: async () => {
      return await API.get(`package/get_departments/${payload}`);
    },
  });
};
export const useGetDirectorate = (payload) => {
  return useQuery({
    queryKey: ["directorates"],
    queryFn: async () => {
      return await API.get(`package/get_directorates/${payload}`);
    },
  });
};

export const useGetRegions = (payload) => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      return await API.get(`package/get_region/${payload}`);
    },
  });
};

export const useGetEmploymentType = () => {
  return useQuery({
    queryKey: ["employment_type"],
    queryFn: async () => {
      return await API.get(`package/getEmployeeType`);
    },
  });
};

export const useGetGrades = () => {
  return useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      return await API.post(`package/getAllGrades`);
    },
  });
};
export const useGetSteps = (payload) => {
  return useQuery({
    queryKey: ["steps", payload],
    queryFn: async ({ queryKey }) => {
      const json = queryKey[1];
      return await API.post(`package/getAllGradesSteps`, json);
    },
  });
};
export const useGetDesignation = () => {
  return useQuery({
    queryKey: ["designation"],
    queryFn: async () => {
      return await API.get(`package/get_organisation_designation`);
    },
  });
};
export const useGetPension = () => {
  return useQuery({
    queryKey: ["pension"],
    queryFn: async () => {
      return await API.get(`package/get_pension`);
    },
  });
};

export const useGetState = (payload) => {
  return useQuery({
    queryKey: ["state"],
    queryFn: async () => {
      return await API.get(`package/get_state/${payload}`);
    },
  });
};

export const useUpdateOfficial = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`profile/update_official`, payload);
    },
  });
};

export const useGetCompanyDesignation = (companyID) => {
  return useQuery({
    queryKey: ["company_designation", companyID],
    queryFn: async () => {
      return await API.get(`package/get_designations/${companyID}`);
    },
  });
};
export const useGetBanks = () => {
  return useQuery({
    queryKey: ["get_banks"],
    queryFn: async () => {
      return await API.get(`package/get_banks`);
    },
  });
};
