/* eslint-disable react/prop-types */
export default function ExpenseDetail({role}){


    const details = [
        { label: "Item", value: "Generator" },
        {
          label: "Description",
          value: "It is needed as the electricity supply is flunctuating",
        },
        {
          label: "Purchased from",
          value: "Konga",
        },
        {
          label: "Purchased by",
          value: "Okunade Olaitan",
        },
        {
          label: "Paid by",
          value: "Cash",
        },
        { label: "Amount", value: "150,000.00", },
        { label: "Date", value: "Feb 5, 2024" },
        // { label: "Approvals", value: <Approvals approvals={currentViewExpenses.approvals} /> },
        { label: "Status", value: "approved" },
      ];


    return(
        <>
            <div className="bg-white py-4 px-6 shadow rounded">
      <h2 className="mb-5 text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">Expense Details</h2>
        <ul className="flex flex-col gap-5 my-4">
          {details.map((detail, i) => (
            <li
              className="grid grid-cols-3 gap-4 border-b"
              key={i}
            >
              <p className="text-[#444e4e] font-helvetica font-[500] text-[0.9rem] capitalize">{detail.label}</p>
              <span className="col-span-2 text-[#888888]  text-en w-full  max-w-sm fontbold font-profileFontSize">{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
      {
        role !== 'request' &&
        <div className="flex justify-between mt-3">
            <button className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Reject</button>

            <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Approve</button>
        </div>
      }
        </>
    )
}