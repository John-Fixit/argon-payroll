import { Fragment } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
export default function AuthForm() {
    const validation = yup.object().shape({
        firstName: yup.string().required("Please provide your first name."),
        lastName: yup.string().required("Please provide your last name."),
        city: yup.string().required("Please provide a valid city."),
        state: yup.string().required("Please provide a valid state.")
    })
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            city: "",
            state: ""
        },
        onSubmit: (values) => {
            // console.log(values);
        },
        validationSchema: validation
    })
  return (
    <Fragment>
        <form onSubmit={formik.handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 ">
              First Name
            </label>
            <input
              type="text"
              id="FirstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First name"
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none focus:border ${formik.touched.firstName ? formik.errors.firstName ? 'is-invalid' : 'is-valid': ''}`}
            />
             {
                formik.touched.firstName &&
                <small className={`${formik.touched.firstName && formik.errors.firstName ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>{formik?.errors?.firstName ?? 'Looks Good!'}</small>
            }
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last name"
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none focus:border ${formik.touched.lastName ? formik.errors.lastName ? 'is-invalid' : 'is-valid': ''}`}
            />
            {
                formik.touched.lastName &&
                <small className={`${formik.touched.lastName && formik.errors.lastName ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>{formik?.errors?.lastName ?? 'Looks Good!'}</small>
            }
          </div>
          <div className="col-span-6">
            <label htmlFor="City" className="block text-sm font-medium text-gray-700 uppercase font-semibold ">City </label>
            <input
              type="text"
              id="City"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder= "City"
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none focus:border ${formik.touched.city ? formik.errors.city ? 'is-invalid' : 'is-valid': ''}`}
            />
             {
                formik.touched.city &&
                <small className={`${formik.touched.city && formik.errors.city ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>{formik?.errors?.city ?? 'Looks Good!'}</small>
            }
          </div>
          <div className="col-span-6">
            <label htmlFor="State" className="block text-sm font-medium text-gray-700 uppercase font-semibold ">State </label>
            <input
              type="text"
              id="State"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder= "State"
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none ${formik.touched.state ? formik.errors.state ? 'is-invalid' : 'is-valid': ''}`}
            />
             {
                formik.touched.state &&
                <small className={`${formik.touched.state && formik.errors.state ? 'text-red-500' : 'text-emerald-600 font-bold'}`}>{formik?.errors?.state ?? 'Looks Good!'}</small>
            }
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
            type="submit"
              className="inline-block shrink-0 rounded-md border border-blue-400 bg-blue-400 px-4 py-2 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none"
            >
              SUBMIT
            </button>
            
          </div>
        </form>
    </Fragment>
  )
}
