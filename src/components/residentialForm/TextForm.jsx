/* eslint-disable react/prop-types */
import { Select, SelectItem } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import useCurrentUser from '../../hooks/useCurrentUser'
import { useGetProfile } from '../../API/profile'
import { useGetLga, useGetState } from '../../API/profile'
import useFormStore from '../formRequest/store'
import { MdErrorOutline } from 'react-icons/md'
import Label from '../forms/FormElements/Label'
import { Input, Select as AntSelect } from 'antd'
import { useEffect } from 'react'
import { debounce } from 'lodash'

export default function TextForm({ onNext }) {
  const { userData } = useCurrentUser()
  const { data: profile } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" })

  const { updateData, data } = useFormStore()

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      home_address: data?.address?.home_address ?? profile?.RESIDENTIAL_INFORMATION?.HOME_ADDRESS ?? "",
      home_state: data?.address?.home_state ?? profile?.RESIDENTIAL_INFORMATION?.HOME_STATE ?? "",
      home_lga: data?.address?.home_lga ?? profile?.RESIDENTIAL_INFORMATION?.HOME_LGA ?? "",
    },
  })




  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    updateData({ address: values, dataError: errors });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors, debouncedUpdateData]);















  const { data: getStates, isLoading: isStateLoading } = useGetState(
    11354
  )
  const { data: getLga, isLoading: isLgaLoading } = useGetLga(
    watch().home_state
  )


  const states = [
    ...(getStates?.map((item) => ({
      ...item,
      value: item?.STATE_ID,
      label: item?.STATE_NAME,
    })) || []), // Safely handle undefined getStates
  ];
  const lgas = [
    ...(getLga?.map((item) => ({
      ...item,
      value: item?.LGA_ID,
      label: item?.LGA_NAME,
    })) || []),
  ];


 


  const onSubmit = async (data) => {

    updateData({ address: data })
    
    onNext()
  }



  const onFieldChange = async (fieldName) => {
    // Trigger validation for the specific field
    await trigger(fieldName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-white shadow-m rounded borde py-6 flex justify-center flex-col gap-4'>
        <div className=''>
          <Label>ADDRESS</Label>
        <Controller
          name='home_address'
          control={control}
          render={({ field }) => (
            <>
            <Input
            aria-label="address"
            size="large"
            placeholder="Address"
            status={touchedFields?.home_address && errors?.home_address ? "error" : ""}
            {...field}
            className="w-full rounded-md"
              onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("home_address");
                  }}
            
          />
             <span className="text-red-500">
                  {touchedFields?.home_address && errors?.home_address?.message}
                </span>
            </>
          )}
          rules={{ required: "This field is required" }}
        />
         
        </div>
        <div className=''>
          <Label>State of Residence:</Label>
          
          <Controller
            name='home_state'
            control={control}
            render={({ field }) => (
              <AntSelect
                  aria-label="home_state"
                  size="large"
                  showSearch
                  placeholder="Select State of residence"
                  optionFilterProp="label"
                 loading={isStateLoading}
                  options={states}
                  status={touchedFields?.home_state && errors?.home_state ? "error" : ""}
                  className="w-full"
                  {...field}

                  onChange={(value) => {
                    field.onChange(value);
                    onFieldChange("home_state");
                  }}
                />
            )}
            // rules={{ required: true }}
          />
        </div>
       
        <div className=''>
          <Label>LGA</Label>
          <Controller
            name='home_lga'
            control={control}
            render={({ field }) => (
              <AntSelect
                  aria-label="home_lga"
                  size="large"
                  showSearch
                  placeholder="Select Local Government"
                  optionFilterProp="label"
                 loading={isLgaLoading}
                  options={lgas}
                  status={touchedFields?.home_lga && errors?.home_lga ? "error" : ""}
                  className="w-full"
                  {...field}

                  onChange={(value) => {
                    field.onChange(value);
                    onFieldChange("home_lga");
                  }}
                />
            )}
            // rules={{ required: true }}
          />
        </div>

        {/* <div className='grid grid-cols-2 w-full flex-wrap  mb-6 md:mb-0 mt-4 gap-4'>
          <Controller
            name='home_state'
            control={control}
            render={({ field }) => (
              <Select
                labelPlacement='outside'
                label='State of origin'
                isInvalid={!!errors.nationality}
                variant='bordered'
                placeholder='state of origin'
                selectedKeys={field.value ? [field.value] : []}
                {...field}
                isLoading={isStateLoading}
              >
                {states?.map((state) => (
                  <SelectItem key={state.STATE_ID} value={state.STATE_ID}>
                    {state.STATE_NAME}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name='home_lga'
            control={control}
            render={({ field }) => (
              <Select
                labelPlacement='outside'
                label='LGA'
                isInvalid={!!errors.nationality}
                variant='bordered'
                placeholder='LGA'
                selectedKeys={field.value ? [field.value] : []}
                {...field}
                isLoading={isLgaLoading}
              >
                {lgas?.map((cou) => (
                  <SelectItem key={cou.LGA_ID} value={cou.LGA_ID}>
                    {cou.LGA_NAME}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div> */}
      </div>
      {/* <div className='flex justify-end'>
        <Button
          type='submit'
          color='secondary'
          className='my-4 text-white rounded'
        >
          Next
        </Button>
      </div> */}
      <div className='flex justify-end py-3'>
        <button
          type='submit'
          className='bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
        >
          Next
        </button>
      </div>
    </form>
  )
}
