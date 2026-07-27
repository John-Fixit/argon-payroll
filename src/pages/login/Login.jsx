/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "/assets/images/community-logo.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginUserAction } from "../../API/auth";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { Send } from "lucide-react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import ResetPasswordSetByAdmin from "../../components/profile/resetPassword_forms/ResetPasswordSetByAdmin";
import useAdPopupStore from "../../hooks/useAdsPopup";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const [passwordDrawer, setPasswordDrawer] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAdPopupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    // console.log(values);
    setloading(true);
    // setCurrentUser(values)
    // navigate('/')

    const res = await loginUserAction({
      username: values?.username?.trim() || "",
      password: values?.password?.trim() || "",
    });
    if (res) {
      setloading(false);
      setCurrentUser(res);
      handleLogin();

      // console.log(res)

      if (res?.data?.PASSWORD_RESET) {
        handleOpenPasswordDrawer();
      } else {
        navigate("/");
      }
    } else {
      setloading(false);
      // setCurrentUser(values)
    }
  };

  //password visible function
  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOpenPasswordDrawer = () => {
    setPasswordDrawer(true);
  };
  const handleClosePasswordDrawer = () => {
    setPasswordDrawer(false);
  };

  return (
    <>
      <main className="w-full bg-none flex flex-col space-y-5 items-center justify-center h-[100vh] px-3">
        <img src={logo} alt="communeety logo" />
        <section className="form_section w-[85%] lg:w-[45vw] xl:w-[30vw] md:w-[55vw] rounded-md bg-white shadow-md p-10 ">
          <div className="form_header text-center pb-3">
            <h4 className="text-gray-700 text-2xl font-medium">Login</h4>
            <p className="text-gray-400 font-medium text-md mb-[1.5rem]">
              Access to our dashboard
            </p>
          </div>
          <form
            className="flex flex-col space-y-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="email_address flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="font-medium text-gray-600 text-sm"
              >
                Email Address Or ID
              </label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("username", { required: true })}
                placeholder="Email address or ID"
                className="mt-1 w-full border bg-white py-3 lg:py-[0.475rem] px-3 focus:outline-none text-gray-800 rounded"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="password flex flex-col space-y-1 ">
              <div className="password_label flex justify-between">
                <label
                  htmlFor="Password"
                  className="font-medium text-gray-600  text-sm"
                >
                  Password
                </label>
                <label
                  htmlFor="Forgot_password"
                  className="font-medium text-[#8e8e8e] text-xs cursor-pointer"
                >
                  Forgot Password?
                </label>
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="Password"
                  name="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="mt-1 w-full border bg-white py-3 lg:py-[0.475rem] px-3 focus:outline-none text-gray-600 rounded "
                />
                <span
                  className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-600  cursor-pointer"
                  onClick={handlePasswordVisibleChange}
                >
                  {passwordVisible ? (
                    <FaEye size={"18px"} />
                  ) : (
                    <FaEyeSlash size={"18px"} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="submit_btn">
              <button
                disabled={loading}
                type="submit"
                className="text-lg  w-full bg-[#00bcc2] hover:bg-[#00bcc2]/40 active:bg-[#00bcc2]/80 p-[4px] text-white rounded-md"
              >
                <div className="flex items-center justify-center gap-x-2">
                  {loading ? (
                    <Spinner
                      size="sm"
                      classNames={{ circle1: "border-white/80" }}
                    />
                  ) : (
                    <Send size={15} />
                  )}
                  Login
                </div>
              </button>
            </div>
            <div className="dont_have_acc text-center text-[15px] font-medium text-black">
              {/* <p>
                Don&apos;t have an account yet?{" "}
                <span className="cursor-pointer text-[#00bcc2]">Register</span>
              </p> */}
            </div>
          </form>
        </section>
      </main>
      <ExpandedDrawerWithButton
        maskClosable={false}
        isOpen={passwordDrawer}
        onClose={handleClosePasswordDrawer}
        maxWidth={450}
      >
        <ResetPasswordSetByAdmin closeDrawer={handleClosePasswordDrawer} />
      </ExpandedDrawerWithButton>
    </>
  );
}
