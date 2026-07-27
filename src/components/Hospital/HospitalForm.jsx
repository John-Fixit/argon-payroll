/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { Select as AntSelect } from "antd";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  useAddHospital,
  useGetHMO,
  useGetHospital,
  useGetProfile,
  useGetState,
} from "../../API/profile";
import useFormStore from "../formRequest/store";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import useCurrentUser from "../../hooks/useCurrentUser";
import { API_URL } from "../../API/api_urls/api_urls";

export default function HospitalForm({ setIsOpen }) {

  const { updateDataGroup, data_group, resetState } =
    useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useCurrentUser();

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const addHospital = useAddHospital();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({});

  //set function mutation

  const hmo_id = useWatch({ control, name: "hmo_id" });
  const state = useWatch({ control, name: "state" });

  //get details
  const { data: getHospital, isLoading: hospitalLoading } = useGetHospital({
    hmo_id,
    state,
  });
  const { data: getFamily, isLoading: familyLoading } = useGetProfile({
    key: "family",
    path: API_URL.getFamily,
  });
  const { data: getHmo, isLoading: hmoLoading } = useGetHMO(company_id);
  const { data: getState, isLoading: stateLoading } = useGetState(11354); //we use 100 because code for Nigeria is 100


  const family_data = getFamily?.data?.map((item) => {
    return {
      ...item,
      value: item?.STAF_FAMILY_ID,
      label: `${item?.STAFF_FAMILY_FIRST_NAME} ${item?.STAFF_FAMILY_LAST_NAME}`,
    };
  });
  const hospital = getHospital?.map((item) => {
    return {
      ...item,
      value: item?.ID,
      label: item?.HOSPITAL_NAME,
    };
  });

  const hmo_data = getHmo?.map((item) => {
    return {
      ...item,
      value: item?.HMO_ID,
      label: item?.HMO_NAME,
    };
  });
  const state_data = getState?.map((item) => {
    return {
      ...item,
      value: item?.STATE_NAME,
      label: item?.STATE_NAME,
    };
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const { family, hospital, hospital_for } = data;

      const json = {
        staff_id,
        company_id,
        family: hospital_for ? family : 0,
        hospital_id: hospital,
        data_group: data_group?.length
          ? [
              ...data_group,
              {
                family: hospital_for ? family : 0,
                hospital_id: hospital,
                staff_id,
                company_id,
              },
            ]
          : null,
        is_grouped: data_group?.length ? 1 : 0,
        action: "add",
      };

      addHospital.mutate(json, {
        onSuccess: (data) => {
          const resMsg = data?.data?.message;

          successToast(resMsg);

          reset();
          resetState();
          setIsOpen(false);
        },
        onError: (error) => {
          const errMsg = error.response?.data?.message ?? error.message;
          errorToast(errMsg);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);

      setIsLoading(false);
    }
  };

  const addToLIST = () => {
    const { family, hospital, hospital_for } = getValues();

    const json = {
      family: hospital_for ? family : 0,
      hospital_id: hospital,
      staff_id,
      company_id,
    };

    updateDataGroup(json);

    reset();
  };

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  // Custom filter function
  const filterOption = (input, option) => {
    const { label, ADDRESS, LGA } = option || {};
    const inputLower = input.toLowerCase();
    return (
      label?.toLowerCase().includes(inputLower) ||
      ADDRESS?.toLowerCase().includes(inputLower) ||
      LGA?.toLowerCase().includes(inputLower)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow-md rounded border flex justify-center flex-col gap-4 p-5">
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Hospital For:
          </h5>
          <Controller
            name="hospital_for"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="hospital_for"
                  size="large"
                  showSearch
                  placeholder="Who did you want to add hospital for?"
                  optionFilterProp="label"
                  onChange={(value) => onChange(value, "hospital_for")}
                  // onSearch={onSearch}
                  options={[
                    { label: "Myself", value: 0 },
                    { label: "Family", value: 1 },
                  ]}
                  status={errors?.hospital_for ? "error" : ""}
                  {...field}
                  className="w-full"
                />
                <span className="text-red-500">
                  {errors?.hospital_for?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        {watch("hospital_for") ? (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Family member
            </h5>
            <Controller
              name="family"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="family"
                    size="large"
                    showSearch
                    loading={familyLoading}
                    placeholder="Select Family member"
                    optionFilterProp="label"
                    onChange={(value) => onChange(value, "family")}
                    // onSearch={onSearch}
                    options={family_data}
                    status={errors?.family ? "error" : ""}
                    className="w-full"
                    {...field}
                  />

                  <span className="text-red-500">
                    {errors?.family?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        ) : null}
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Select HMO
          </h5>
          <Controller
            name="hmo_id"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="hmo_id"
                  size="large"
                  showSearch
                  loading={hmoLoading}
                  placeholder="Select HMO..."
                  optionFilterProp="label"
                  onChange={(value) => onChange(value, "hmo_id")}
                  // onSearch={onSearch}
                  options={hmo_data}
                  className="w-full"
                  status={errors?.hmo_id ? "error" : ""}
                  {...field}
                />

                <span className="text-red-500">{errors?.hmo_id?.message}</span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>

        {watch("hmo_id") ? (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              State
            </h5>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="state"
                    size="large"
                    showSearch
                    loading={stateLoading}
                    placeholder="Select State"
                    optionFilterProp="label"
                    onChange={(value) => onChange(value, "state")}
                    // onSearch={onSearch}
                    options={state_data}
                    status={errors?.state ? "error" : ""}
                    className="w-full"
                    {...field}
                  />

                  <span className="text-red-500">{errors?.state?.message}</span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        ) : null}
        {watch("state") ? (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Hospital Name
            </h5>
            <Controller
              name="hospital"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="hospital"
                    size="large"
                    showSearch
                    loading={hospitalLoading}
                    placeholder="Select Hospital"
                    optionFilterProp="label" // Keeping this, though your custom filter is more important
                    onChange={(value) => onChange(value, "hospital")}
                    options={hospital}
                    filterOption={filterOption}
                    optionRender={(option) => (
                      <>
                        <p className="font-medium">
                          {option?.data?.label} |
                          <span className="font-light">
                            {" "}
                            {option?.data?.LGA}
                          </span>{" "}
                          |{" "}
                          <span className="font-light">
                            {option?.data?.ADDRESS}
                          </span>
                        </p>
                      </>
                    )}
                    status={errors?.hospital ? "error" : ""}
                    className="w-full"
                    {...field}
                  />
                  <span className="text-red-500">
                    {errors?.hospital?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Hospital name is required" }}
            />
          </div>
        ) : null}
      </div>
      <div className="flex  justify-between py-3">
        <button
          type="button"
          onClick={addToLIST}
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
        >
          Add to list
        </button>
        <button
          type="submit"
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center"
        >
          {isLoading ? <Spinner color="default" size="sm" /> : null}
          Submit
        </button>
      </div>
    </form>
  );
}
