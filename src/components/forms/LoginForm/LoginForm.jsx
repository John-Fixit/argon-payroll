import { useFormik } from 'formik'
import { Fragment } from 'react'
import * as yup from "yup"
export default function LoginForm() {
    const validation = yup.object().shape({
        email: yup.string().required("Please provide an email address."),
        password: yup.string().required("Please provide password.")
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            passwowrd: ""
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
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700 uppercase font-semibold ">Your Email: </label>
            <input
              type="email"
              id="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder= "Enter your email address..."
              value={formik.values.email}
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none focus:border ${formik.touched.email ? formik.errors.email ? 'is-invalid' : 'is-valid': ''}`}
            
            />
            {
                formik.touched.email &&
                <small className={`${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-emerald-500 font-bold'}`}>{formik?.errors?.email ?? 'Looks Good!'}</small>
            }
          </div><br />
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700 uppercase font-semibold ">Your Password: </label>
            <input
              type="password"
              id="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder= "Enter your password..."
              className={`mt-1 form-control px-3 py-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus: shadow-none focus:border ${formik.touched.password ? formik.errors.password ? 'is-invalid' : 'is-valid': ''}`}
            />
            {
                    formik.touched.password &&
                    <small className={`${formik.touched.password && formik.errors.password ? 'text-red-500' : 'text-emerald-500 font-bold'}`}>{formik?.errors?.password ?? 'Looks Good!'}</small>
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
