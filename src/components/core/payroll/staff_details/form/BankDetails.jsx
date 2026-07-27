import { Input, } from "antd";

const BankDetails = () => {


  return (
    <>
      <main>
        <div className="bg-white rounded flex justify-center flex-col gap-4">

        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Bank Name
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter Bank Name"
              />
            </div>
          </div>
        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Account Number
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter Account Number"
              />
            </div>
          </div>
        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              NHF Number
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter NHF Number"
              />
            </div>
          </div>
        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                PFA Code
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter PFA Code"
              />
            </div>
          </div>
        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                PFA  Account Number
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter PFA  Account Number"
              />
            </div>
          </div>
        <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                TIN Number
            </h5>
            <div>
              <Input
                className="w-full py-2"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Enter Account Number"
              />
            </div>
          </div>
         
          
        </div>
        <div className="flex justify-end py-3">
          <button
            //   onClick={goToNextTab}
            className="bg-btnColor px-4 font-helvetica py-1 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default BankDetails;
