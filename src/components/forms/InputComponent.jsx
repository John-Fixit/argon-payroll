import { FaCheck, FaEye } from "react-icons/fa6";
import { MdErrorOutline, MdLockOutline } from "react-icons/md";

const InputComponent = () => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2">
        <h1>Input</h1>
        <hr className="w-full" />
      </div>
      
      <div className="relative my-4">
        <input
          type="text"
          name=""
          id=""
          className="w-full py-2 ps-8 pe-2 text-sm outline-none rounded border focus:border-none"
          placeholder="Input group prepended"
        />
        <FaEye className="text-sidebarInptextColor absolute top-3 left-2" />
      </div>

      <div className="relative my-4">
        <input
          type="text"
          name=""
          id=""
          className="w-full p-2 text-sm outline-none rounded border focus:border-none"
          placeholder="Input group appended"
        />
        <MdLockOutline className="text-sidebarInptextColor absolute top-3 right-2" />
      </div>
      <div className="relative my-4">
        <input
          type="text"
          name=""
          id=""
          className="w-full py-2 px-8 text-sm outline-none rounded border border-green-500"
          placeholder="Input group prepended"
        />
        <FaEye className="absolute top-3 left-2 text-green-500" />
        <FaCheck className="absolute top-3 right-2 text-green-500 font-extrabold" />
      </div>
      <div className="relative my-4">
        <input
          type="text"
          name=""
          id=""
          className="w-full py-2 px-8 text-sm outline-none rounded border border-red-500"
          placeholder="Input group appended"
        />
        <MdErrorOutline className="absolute top-3 right-10 text-red-500" />
        <MdLockOutline className="absolute top-3 right-2 text-red-500 font-extrabold" />
      </div>

      <div className="my-4">
        <label className="uppercase text-sm" htmlFor="flush">
          Rounded
        </label>
        <input
          type="text"
          name=""
          id="flush"
          className="w-full py-2 px-3 text-sm outline-none rounded-full border focus:border-indigo-400"
          placeholder="search icons"
        />
      </div>

      {/* Flush */}
      <div className="my-4">
        <label className="uppercase text-sm" htmlFor="flush">
          Flush
        </label>
        <input
          type="text"
          name=""
          id="flush"
          className="w-full py-2 px-3 text-sm outline-none bg-transparent"
          placeholder="search icons"
        />
      </div>
    </div>
  );
};

export default InputComponent;
