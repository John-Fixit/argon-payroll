/* eslint-disable react/prop-types */


const RequestDetail = ({details}) => {
    // console.log(details)

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
};

  return (
    <>
      <div className="shadow border rounded p-4 bg-white w-full font-helvetica">
        <h4 className="text-2xl font-medium">APPROVAL DETAILS</h4>
                     <div className="w-[8rem] h-[8rem] my-4 rounded-full border-2 border-gray-200 overflow-auto bg-gray-50">
              <img
               src={details?.data?.FILE_NAME}
                className="w-full h-full object-cover"
                alt=""
              />
          </div>
        <ul className="flex flex-col gap-5 my-4">
          {details?.data?.STAFF_FAMILY_FIRST_NAME && Object.entries(details?.data)?.filter(([key]) => key !== 'FILE_NAME')?.map(([key,value], i) => (
            <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
              <p className="font-medium font-helvetica uppercase">{key.replace(/_/g, ' ')}</p>
              <span className="text-gray-400 col-span-2">{key.includes('DATE') ? formatDate(value) : (value !== null ? value : 'N/A')}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RequestDetail