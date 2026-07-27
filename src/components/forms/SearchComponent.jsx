import { IoMdSearch } from "react-icons/io";

const SearchComponent = () => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2">
        <h1>Search</h1>
        <hr className="w-full" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 my-4">
        {/* Regular */}
        <div className="relative">
          <label className="uppercase text-sm" htmlFor="regular">
            Regular
          </label>
          <input
            type="text"
            name=""
            id="regular"
            className="w-full py-2 ps-2 pe-8 text-sm outline-none rounded border"
            placeholder="search icons"
          />
          <IoMdSearch  className="lucide lucide-search  text-sidebarInptextColor absolute top-9 right-2" />
        </div>

        {/* Flush */}
        <div className="relative">
          <label className="uppercase text-sm" htmlFor="flush">
            Flush
          </label>
          <input
            type="text"
            name=""
            id="flush"
            className="w-full py-2 ps-2 pe-8 text-sm outline-none bg-transparent"
            placeholder="search icons"
          />
           <IoMdSearch  className="lucide lucide-search  text-sidebarInptextColor absolute top-9 right-2" />
        </div>
      </div>
      {/* Large */}
      <div className="relative my-4">
        <label className="uppercase" htmlFor="large">
          Large
        </label>
        <input
          type="text"
          name=""
          id="large"
          className="w-full py-2 ps-3 pe-8 outline-none rounded border"
          placeholder="search icons"
        />
         <IoMdSearch  className="lucide lucide-search  text-sidebarInptextColor absolute top-10 right-2" />
      </div>
      {/* Rounded */}
      <div className="relative my-4">
        <label className="uppercase" htmlFor="rounded">
          Rounded
        </label>
        <input
          type="text"
          name=""
          id="rounded"
          className="w-full py-2 px-4 outline-none rounded-full border"
          placeholder="search icons"
        />
         <IoMdSearch  className="lucide lucide-search  text-sidebarInptextColor absolute top-10 right-4" />
      </div>
    </div>
  );
};

export default SearchComponent;
