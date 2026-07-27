/* eslint-disable react/prop-types */
import { Search } from "lucide-react"
const SearchBar = ({packages, searchValue, setSearchValue, setFilteredData }) => {


  const handlePackageFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = packages?.filter((item) => {
        const startsWith =
          item?.name?.toLowerCase().startsWith(value.toLowerCase()) 
          
        const includes =
          item?.name?.toLowerCase().includes(value.toLowerCase()) 
      
        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };










  return (
    <div className="flex flex-col py-4">
       <div className="flex flex-col">
            <div className={`flex items-center h-full bg-gray-200 rounded-md w-[300px] shadow `}>
              <div className="mr-auto flex  h-full  ">
                <button className="pl-3  py-1 pt-[0.5rem] outline-none rounded">
                  {" "}
                  <Search  className=" text-gray-400" size={12} />
                </button>
              </div>
              <input
                name=""
                id=""
                values={searchValue} onChange={handlePackageFilter}
                className="outline-none border-none bg-transparent  px-2 w-full placeholder:text-xs py-2 placeholder:text-gray-400 text-gray-500 "
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
    </div>
  )
}

export default SearchBar
