// import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
import useCurrentUser from '../hooks/useCurrentUser'
import { API_URL } from './api_urls/api_urls'

export const getProfile = async (data) => {
  const json = {
    company_id: data?.COMPANY_ID,
    staff_id: data?.STAFF_ID,
  }

  try {
    const res = await API.post(`profile/get_profile`, json)
    return res?.data
  } catch (error) {
    return error
  }
}

export const useGetProfile = ({ path, key }) => {
  
  const { userData } = useCurrentUser()
  const user = userData?.data
  const json = {
    company_id: String(user?.COMPANY_ID),
    staff_id: String(user?.STAFF_ID),
  }
  return useQuery({
    queryKey: [key ?? 'get_profile'],
    queryFn: async () => {
      const res = await API.post(path ?? `/profile/get_profile`, json)
      return res?.data
    },
  })
}
export const useViewStaffProfile = (viewStaffID) => {
  
  const { userData } = useCurrentUser()
  const user = userData?.data

  return useQuery({
    queryKey: ['view_staff_profile', viewStaffID],
    queryFn: async ({queryKey}) => {
      const viewStaffID = queryKey[1]
      const json = {
        company_id: String(user?.COMPANY_ID),
        staff_id: String(user?.STAFF_ID),
        preview_staff_id: String(viewStaffID),
      }
      const res = await API.post(API_URL?.view_profile, json)
      return res?.data
    },
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/profile/update_profile`, data)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['get_profile'])
    }
  })
}
export const useAddHospital = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/profile/add_hospital`, data)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['hospital'])
    }
  })
}
export const useUpdateSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return API.post(`profile/update_social`, data)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['profile'])
    }
  })
}
export const useAddHospitalReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return API.post(`/profile/add_hospital_review`, data)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['hospital'])
    }
  })
}

export const useGetCountry = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['country'],
    queryFn: async () => {
      const res = await API.post(`/package/get_countries`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetCertificationType = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['certification_type'],
    queryFn: async () => {
      const res = await API.get(`package/get_certification_type`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}

export const useGetState = (country_id) => {
  //   console.log(country_id)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['state', country_id],
    queryFn: async () => {
      const res = await API.get(`/package/get_state/${country_id}`)
      return res?.data?.data
    },
    enabled: !!country_id,
  })
  return { data, isLoading, isError }
}

export const useGetLga = (state_id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lga', state_id],
    queryFn: async () => {
      const res = await API.get(`/package/get_lga/${state_id}`)
      return res?.data?.data
    },
    enabled: !!state_id,
  })

  return { data, isLoading, isError }
}

export const useGetTitle = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['title'],
    queryFn: async () => {
      const res = await API.get(`/package/get_title`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetInstitution = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['institution'],
    queryFn: async () => {
      const res = await API.get(`/package/get_institution`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetCertification = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['certification'],
    queryFn: async () => {
      const res = await API.get(`package/get_certification`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetOrganisation = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['organisation'],
    queryFn: async () => {
      const res = await API.get(`package/get_organisation`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetOrganisationDesignation = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['organisation_designation'],
    queryFn: async () => {
      const res = await API.get(`package/get_organisation_designation`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetCertificationAuthority = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['certification_authority'],
    queryFn: async () => {
      const res = await API.get(`package/get_certification_authority`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetCourse = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const res = await API.get(`/package/get_course`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetDegree = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['degree'],
    queryFn: async () => {
      const res = await API.get(`/package/get_degree`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetDegreeClass = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['degree_class'],
    queryFn: async () => {
      const res = await API.get(`/package/get_class`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}
export const useGetRelationship = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['relationship'],
    queryFn: async () => {
      const res = await API.get(`/package/get_relationship/`)
      return res?.data?.data
    },
  })
  return { data, isLoading, isError }
}

export const useGetGender = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['gender'],
    queryFn: async () => {
      const res = await API.get(`/package/get_gender`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetProfessionBody = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profession_body'],
    queryFn: async () => {
      const res = await API.get(`/package/get_professional_body`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetHMO = (companyID) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hmo', companyID],
    queryFn: async ({queryKey}) => {
      const companyID = queryKey[1]
      const res = await API.get(`package/get_hmo/${companyID}`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetHospital = (payload) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hospital', payload],
    queryFn: async ({queryKey}) => {
      const payload = queryKey[1]
      
      const res = await API.post(`package/get_hospital`, {
        hmo_id: payload?.hmo_id,
        state: payload?.state,
      })
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetFamily = (payload) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['family', payload],
    queryFn: async ({queryKey}) => {
      const payload = queryKey[1]
      
      const res = await API.post(`profile/get_family`, {
        staff_id: payload?.staff_id,
        company_id: payload?.company_id,
      })
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}
export const useGetHospitalReview = (payload) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hospital_review', payload],
    queryFn: async ({queryKey}) => {
      const payload = queryKey[1]
      
      const res = await API.post(API_URL.getHospitalReview, {
        hospital_id: payload?.hospital_id,
        company_id: payload?.company_id,
      })
      return res?.data
    },
  })

  return { data, isLoading, isError }
}

export const useGetMaritalStatus = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['marital_status'],
    queryFn: async () => {
      const res = await API.get(`/package/get_marital_status`)
      return res?.data?.data
    },
  })

  return { data, isLoading, isError }
}

export const useGetPendingDetails= ()=>{
  const pendingDetails = useQuery({
    queryKey: ['pending_approval_details'],
    queryFn: async()=>{
      const res = API.get(``);
      return res?.data?.data
    }
  })
  return pendingDetails
}

export const useGetProfilePayslip = (data)=>{
  const slipDetails = useQuery({
    queryKey: ['staff_payslip_details'],
    queryFn: async()=>{
      const res = await API.post(`profile/view_payslip`, data);
      return res?.data?.data
    }
  })
  return slipDetails
}


export const useSetInstutition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_institution, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['institution'])
    }
  })
}

export const useSetCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_course, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['course'])
    }
  })
}
export const useSetDegree = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_degree, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['degree'])
    }
  })
}
export const useSetCertification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_certification, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['certification'])
    }
  })
}
export const useSetCertificationAuthority = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_certification_authority, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['certification_authority'])
    }
  })
}
export const useSetOrganisation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_organisation, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['organisation'])
    }
  })
}
export const useSetOrganisationDesignation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_organisation_designation, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['organisation_designation'])
    }
  })
}
export const useSetProfessionBody = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.set_profession_body, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['profession_body'])
    }
  })
}
export const useUpdateAttachment = (key) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.update_attachment, payload)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries([key])
    }
  })
}


export const useChangePsw = (name) => {
  const queryClient = useQueryClient();
  const changePsw = useMutation({
    mutationFn: (payload) => {
      const url = name === "staff_reset_password"? API_URL.staff_reset_password : name === "admin_reset_staff_password"? API_URL.admin_reset_staff_password : name === "reset_password_changed_by_admin"? API_URL.staff_reset_password : ""
      return API.post(url, payload)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("get_profile")
    }
  });
  return changePsw;
};