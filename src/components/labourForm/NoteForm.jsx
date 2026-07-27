/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "../../API/profile";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import useFormStore from "../formRequest/store";
import { API_URL } from "../../API/api_urls/api_urls";

const NoteForm = ({ setIsOpen, restartStep }) => {
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const { register, handleSubmit, getValues } = useForm({});

  const [dataGroup, setDataGroup] = useState([]);

  const { userData } = useCurrentUser();
  const { data: {data: profession} } = useGetProfile({
    path: API_URL.getProfession,
    key: "profession",
  });
  const package_id = profession?.package_id;
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { updateData, data, updateDataGroup, data_group, resetState } = useFormStore();

  console.log(data_group);


  const onSubmit = async (formData) => {
    const { notes } = formData;

    // console.log()

    updateData({ notes });

    // const json = {
    //   package_id,
    //   staff_id,
    //   company_id,
    //   attachments: data?.attachments,
    //   data_group: data_group?.length
    //     ? [...data_group, { ...data, attachments: data?.attachments, notes }]
    //     : null,
    //   notes,
    //   is_grouped: data_group?.length ? 1 : 0,
    //   action: "add",
    //   ...data,
    // };

    // console.log(json)


    // try {
    //   const res = await updateProfile(json)
    //   if (res.data.status) {
    //     toast.success(res.data.message, {
    //       style: {
    //         background: 'green',
    //         color: '#fff',
    //         border: '2px solid #fff',
    //       },
    //       position: 'top-right',
    //       duration: 30000,
    //     })
    //     setIsOpen(false)
    // resetState()
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.message ?? error.message, {
    //     style: {
    //       background: 'red',
    //       color: '#fff',
    //       border: '2px solid #fff',
    //     },
    //     position: 'top-right',
    //     duration: 30000,
    //   })
    // }
  };

  const addToLIST = () => {
    const json = {
      attachments: data?.attachments,
      notes: getValues().notes,
      ...data,
    };

    updateDataGroup(json)

    restartStep();
  };

  return (
    <div className="">
      {/* <h3 className='header_h3 text-lg capitalize'> note</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className='w-full mx-auto'>
          <Textarea
            {...register('notes')}
            variant='bordered'
            className='mb-6 md:mb-0 my-2 w-[18.5rem] md:w-full md:w[22rem]'
            labelPlacement='outside'
            placeholder='Enter your note'
          />
        </div> */}

        <div className="">
          <label className="header_h3 pb-4 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Add Note
          </label>
          <div className="flex items-center w-full flexcol">
            <textarea
              // name='notes'
              {...register("notes")}
              className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
            />
          </div>
        </div>

        {/* <div className='flex items-center my-6 justifybetween justify-end'>
          <Button
            color='primary'
            onClick={onPrev}
            className='my-4 text-white rounded'
          >
            Prev
          </Button>
          <Button
            type='submit'
            color='success'
            className='my-4 text-white rounded'
          >
            Submit
          </Button>
        </div> */}
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
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
