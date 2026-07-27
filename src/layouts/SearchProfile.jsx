/* eslint-disable react/prop-types */
import { useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useSearchProfile } from "../API/navbar";
import { useNavigate } from "react-router-dom";
import { filePrefix } from "../utils/filePrefix";
import { debounce } from "lodash";
import { ConfigProvider, Input, List, Modal } from "antd";
import { Spinner, User } from "@nextui-org/react";

const SearchProfile = ({ openSearchContainer, setOpenSearchContainer }) => {
  ///===================== fixit code for search bar =================================

  const { userData } = useCurrentUser();
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const searchProfile = useSearchProfile();

  //   const [openSearchContainer, setOpenSearchContainer] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  // const {data} = useViewStaffProfile(1702)

  const navigateToProfile = (staffID) => {
    navigate(`people/self/profile_details/${staffID}`);
    setSearchValue("");
    closeSearchContainer();
  };
  //functions that open search modal
  const closeSearchContainer = () => {
    setOpenSearchContainer(false);
  };

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderItem = (profile) => ({
    value: profile?.STAFF_ID,
    label: (
      <div
        className="flex justify-between gap-x-8 px-3"
        // onClick={() => navigateToProfile(profile?.STAFF_ID)}
      >
        <User
          name={
            <span className="capitaliz text-muted font-bold text-[14px] font-helvetica">
              {profile?.FIRST_NAME} {profile?.LAST_NAME}
            </span>
          }
          description={
            <span className="text-muted font-bold text-[12px] font-helvetica">
              {profile?.DEPARTMENT}
            </span>
          }
          avatarProps={{
            src: profile?.FILE_NAME ? filePrefix + profile?.FILE_NAME : "",
          }}
        />
      </div>
    ),
  });

  const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const json = {
        company_id,
        staff_id,
        search_name: searchTerm,
      };
      const response = await searchProfile.mutateAsync(json);

      const results = response?.data?.data;

      const flattenedOptions = results.map((user) => renderItem(user));

      setOptions(flattenedOptions);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setOptions([]);
    }
    setLoading(false);
  };

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedFetchSearchResults(value);
  };

  //============================== ends here! ==================================
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#d9d9d9",
              activeBorderColor: "#d9d9d9",
              activeShadow: "0",
            },
          },
        }}
      >
        <Modal
          open={openSearchContainer}
          onCancel={closeSearchContainer}
          closeIcon={null}
          footer={null}
          className="h-auto max-h-[80vh] overflow-auto"
        >
          <div className="sticky top-0 bg-white z-10 py-2">
            <Input.Search
              size="large"
              placeholder="Search Staff name..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center">
              {/* <Spin size="large" /> */}
              <Spinner color="default" />
            </div>
          ) : (
            <List
              dataSource={options}
              renderItem={(item) => (
                <List.Item
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-md"
                  onClick={() => navigateToProfile(item?.value)}
                >
                  {item.label}
                </List.Item> // Use item.label to render the content
              )}
              className="mt-4"
            />
          )}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SearchProfile;
