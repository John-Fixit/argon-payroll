/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Button, Spinner } from "@nextui-org/react";

import { Controller, useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetProfile,
  useUpdateProfile,
  useUpdateSocial,
} from "../../API/profile";
import toast from "react-hot-toast";
import NewInputDesign from "../forms/NewFormDesign";
import { errorToast, successToast } from "../../utils/toastMsgPop";

export default function TextForm({ setIsOpen }) {
  const { userData } = useCurrentUser();
  const { data: profile } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });
  const updateSocial = useUpdateSocial();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fb_link: profile?.BIODATA?.FACEBOOK_LINK,
      lk_link: profile?.BIODATA?.LINKEDIN_LINK,
      tw_link: profile?.BIODATA?.TWITTER_LINK,
      ig_link: profile?.BIODATA?.INSTAGRAM_LINK,
      gp_link: profile?.BIODATA?.GOOGLE_PLUS_LINK,
    },
  });

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const onSubmit = async (data) => {
    const { fb_link, lk_link, tw_link, ig_link, gp_link } = data;

    const json = {
      staff_id: staff_id,
      company_id: company_id,
      facbook_link: fb_link,
      twitter_link: tw_link,
      linkedin_link: lk_link,
      instagram_link: ig_link,
      google_link: gp_link,
    };
    updateSocial.mutate(json, {
      onSuccess: (data) => {
        const resMsg = data?.data?.message;

        successToast(resMsg);

        reset();
        setIsOpen(false);
      },
      onError: (error) => {
        const errMsg = error.response?.data?.message ?? error.message;
        errorToast(errMsg);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow-md rounded border flex justify-center flex-col gap-4 py-5">
        {/* <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2> */}

        <Controller
          name="fb_link"
          control={control}
          render={({ field }) => (
            <NewInputDesign
              type="text"
              label="Facebook"
              placeholder="Facebook "
              {...field}
              errorMessage={errors?.fb_link?.message}
              isInvalid={!!errors?.fb_link}
            />
          )}
        />
        <Controller
          name="lk_link"
          control={control}
          render={({ field }) => (
            <NewInputDesign
              type="text"
              label="LinkedIn"
              placeholder="LinkedIn "
              {...field}
              errorMessage={errors?.lk_link?.message}
              isInvalid={!!errors?.lk_link}
            />
          )}
        />
        <Controller
          name="ig_link"
          control={control}
          render={({ field }) => (
            <NewInputDesign
              type="text"
              label="Instagram"
              placeholder="Instagram "
              {...field}
              errorMessage={errors?.ig_link?.message}
              isInvalid={!!errors?.ig_link}
            />
          )}
        />
        <Controller
          name="tw_link"
          control={control}
          render={({ field }) => (
            <NewInputDesign
              type="text"
              label="Twitter"
              placeholder="Twitter "
              {...field}
              errorMessage={errors?.tw_link?.message}
              isInvalid={!!errors?.tw_link}
            />
          )}
        />
        <Controller
          name="gp_link"
          control={control}
          render={({ field }) => (
            <NewInputDesign
              type="text"
              label="Google+"
              placeholder="Google+ "
              {...field}
              errorMessage={errors?.gp_link?.message}
              isInvalid={!!errors?.gp_link}
            />
          )}
        />
      </div>
      <div className="flex justify-end py-3">
        <button
          type="submit"
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center gap-x-2"
        >
          {updateSocial?.isPending ? (
            <Spinner color="default" size="sm" />
          ) : null}
          Submit
        </button>
      </div>
    </form>
  );
}
