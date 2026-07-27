/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Tabs, Tab, Avatar, Skeleton, Spinner } from "@nextui-org/react";
import PersonalInformation from "./PersonalInformation";
import Official from "./Official";
import { useEffect, useState } from "react";
import AcedemicTab from "./profileDrawer/tabs/AcedemicTab";
import ProfessionalTabs from "./profileDrawer/tabs/ProfessionalTabs";
import FamilyComponent from "./FamilyComponent";
import ContactComponent from "./ContactComponent";
import { Edit3Icon } from "lucide-react";
import SocialInformationDrawer from "./profileDrawer/SocialInformationDrawer";
import PensionComponent from "./PensionComponent";
import Salary from "./Salary";
import { useGetProfile, useUpdateProfile } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import FileModal from "./FileModal";
import Document from "../self_services/document/Document";
import { FaPencil } from "react-icons/fa6";
import { Modal } from "antd";
import axios from "axios";
import { errorToast } from "../../utils/toastMsgPop";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "../forms/FormElements/ActionButton";
import {
  FaSquareFacebook,
  FaSquareGooglePlus,
  FaLinkedin,
  FaSquareTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { baseURL, filePrefix } from "../../utils/filePrefix";
import profileImage from ".../../../../assets/images/user_profile.png";

const IconLink = ({ data }) => {
  const link = data?.link;
  const isValid = (() => {
    try {
      new URL(link);
      return true;
    } catch {
      return false;
    }
  })();
  return (
    <>
      <a
        href={isValid ? link : undefined}
        target={isValid ? "_blank" : undefined}
        rel={isValid ? "noopener noreferrer" : undefined}
      >
        <data.icon
          link={data?.link}
          size={20}
          color={data?.color}
          className={`text-[${data?.color}] cursor-pointer`}
        />
      </a>
    </>
  );
};

export default function ProfileHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openPictureModal, setOpenPictureModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectedKey, setSelectedKey] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const tabParam = searchParams?.get("tab");

  useEffect(() => {
    if (tabParam) {
      setSelectedKey(tabParam); // Set selected tab based on the URL
    } else {
      // Optionally set a default tab if tabParam is not in the URL
      setSelectedKey("defaultKey"); // replace 'defaultKey' with your actual default tab key
    }
    setLoading(false); // Mark loading as false after setting the tab
  }, [tabParam]);

  const handleEditSocial = () => {
    setIsDrawerOpen(true);
  };

  const { userData } = useCurrentUser();
  const { data: profile, profileLoading } = useGetProfile({
    user: userData?.data,
    key: "profile",
  });

  const package_id = profile?.PROFILE_PICTURE?.PACKAGE_ID;
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  let tabs = [
    {
      id: "profile",
      label: "Profile",
      content: [
        <PersonalInformation />,
        <ContactComponent />,
        <FamilyComponent />,
      ],
    },
    {
      id: "document",
      label: "Document",
      content: [<Document />],
    },

    {
      id: "official",
      label: "Official",
      content: [
        <Official profile={profile} isLoading={profileLoading} />,
        <PensionComponent profile={profile} />,
      ],
    },
    {
      id: "salary",
      label: "Salary",
      content: [<Salary />],
    },

    {
      id: "academic & certification",
      label: "Academic & Certification",
      content: [<AcedemicTab />],
    },
    {
      id: "work experience & profession",
      label: "Work Experience & Profession",
      content: [<ProfessionalTabs />],
    },
  ];

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const updateProfile = useUpdateProfile();

  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));

    handleOpenPictureModal();
  };

  const uploadFile = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url: baseURL + "attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });

      if (res) {
        return res.data;
      }
    } catch (err) {
      errorToast(err?.response?.data?.message ?? err?.message);

      throw err;
    }
  };

  const saveProfilePicture = async () => {
    const json = {
      package_id,
      company_id,
      staff_id,
      profile_picture: "",
    };

    setIsLoading(true);

    try {
      const fileFormData = new FormData();

      fileFormData.append("file", imageFile);

      let res = await uploadFile(fileFormData);

      json["profile_picture"] = res?.file_url_id;

      updateProfile.mutate(json, {
        onSuccess: () => {
          handleClosePictureModal();
        },
        onError: (err) => {
          const errMsg = err?.response?.data?.message;
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

  const handleOpenPictureModal = () => {
    setOpenPictureModal(true);
  };
  const handleClosePictureModal = () => {
    setOpenPictureModal(false);
  };

  const handleTabClick = (tab) => {
    const encodedURI = encodeURIComponent(tab);
    navigate(`/people/self/profile?tab=${encodedURI}`);
  };

  const socialLinks = [
    {
      link: profile?.BIODATA?.FACEBOOK_LINK,
      icon: FaSquareFacebook,
      color: "#316FF6",
    },
    {
      link: profile?.BIODATA?.TWITTER_LINK,
      icon: FaSquareTwitter,
      color: "#1DA1F2",
    },
    {
      link: profile?.BIODATA?.INSTAGRAM_LINK,
      icon: FaSquareInstagram,
      color: "#e4405f",
    },
    {
      link: profile?.BIODATA?.LINKEDIN_LINK,
      icon: FaLinkedin,
      color: "#0a66c2",
    },
    {
      link: profile?.BIODATA?.GOOGLE_PLUS_LINK,
      icon: FaSquareGooglePlus,
      color: "#dd4b39",
    },
  ];

  return (
    <>
      <div className="card bg-white fontOswald rounded-md shadow-sm p-4 mb-0">
        <div className="profile-view flex md:flex-nowrap flex-wrap justify-between  gap-4">
          <div className="flex flex-col text-center items-center justify-center md:w-auto w-full md:flex md:flex-row md:justify-start md:items-start md:text-start gap-8 my-4">
            <div className="profile-img py-4 md:py-0">
              {!profile ? (
                <Skeleton className="flex rounded-full w-12 h-12" />
              ) : (
                <div className="relative">
                  <Avatar
                    src={
                      profile?.PROFILE_PICTURE?.FILE_NAME
                        ? filePrefix + profile?.PROFILE_PICTURE.FILE_NAME
                        : profileImage
                    }
                    alt="User Image"
                    className="h-28 w-28 rounded-full"
                  ></Avatar>
                  <label htmlFor="image" className="absolute bottom-0 right-0">
                    <div className="h-8 w-8 rounded-full flex justify-center items-center bg-[#00bcc2] text-white cursor-pointer">
                      <FaPencil fontSize={"1rem"} className="" />
                    </div>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif, .pdf"
                      size="sm"
                      className="rounded-sm hidden"
                      label="Image"
                      placeholder="image"
                      id="image"
                      name="image"
                      onChange={handleChooseFile} // Add the desired file types
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="profile-info-left mb-4 ">
              {!profile ? (
                <div className="flex flex-col gap-y-3 mt-3">
                  <Skeleton className="h-3 w-48 rounded-lg" />
                  <Skeleton className="h-3 w-60 rounded-lg" />
                  <Skeleton className="h-3 w-32 rounded-lg" />
                  <Skeleton className="h-3 w-20 rounded-lg" />
                  <Skeleton className="h-3 w-20 rounded-lg" />
                  <div className="flex gap-x-2">
                    <Skeleton className="h-[20px] w-[20px] rounded" />
                    <Skeleton className="h-[20px] w-[20px] rounded" />
                    <Skeleton className="h-[20px] w-[20px] rounded" />
                    <Skeleton className="h-[20px] w-[20px] rounded" />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-[1.2rem] text-[#333333] font-semibold font-helvetica">
                    {profile?.BIODATA?.FIRST_NAME} {""}{" "}
                    {profile?.BIODATA?.LAST_NAME}
                  </h3>
                  {profile?.SETTINGS?.HAS_DIRECTORATE && (
                    <h6 className="text-muted font-bold text-[14px] mb-2 font-helvetica">
                      {profile?.BIODATA?.DIRECTORATE}
                    </h6>
                  )}
                  {profile?.SETTINGS?.HAS_DEPARTMENT && (
                    <h6 className="text-muted font-bold text-[12px] font-helvetica">
                      {profile?.BIODATA?.DEPARTMENT}
                    </h6>
                  )}
                  {profile?.SETTINGS?.HAS_GRADING && (
                    <div className="staff-id text-black font-semibold text-[0.7rem] mt-2 font-helvetica">
                      GRADE :{" "}
                      <span className="text-gray-600 font-helvetica">
                        {profile?.BIODATA?.GRADE ?? "NIL"}
                      </span>
                    </div>
                  )}

                  {profile?.SETTINGS?.HAS_UNIT && (
                    <h6 className="text-muted font-bold text-[12px] font-helvetica">
                      {profile?.BIODATA?.UNIT}
                    </h6>
                  )}
                  <div className="staff-id text-black font-semibold text-[0.7rem] mt-2 font-helvetica">
                    STAFF NO :{" "}
                    <span className="text-gray-600 font-helvetica">
                      {profile?.BIODATA?.STAFF_NUMBER ?? "NIL"}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2 my-2 font-bold items-center justify-center md:justify-start">
                    {socialLinks?.map((item, index) => (
                      <IconLink
                        key={index}
                        data={{
                          link: item?.link,
                          icon: item?.icon,
                          color: item?.color,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="mt-4 flex md:justify-start justify-center">
                <ActionButton
                  className={"flex gap-x-1"}
                  onClick={handleEditSocial}
                >
                  Edit <Edit3Icon size={14} />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {!loading ? (
          <Tabs
            variant="underlined"
            className="bg-white overflow-auto text-[#888888] font-medium rounded-b shadow border-t-1"
            aria-label="Dynamic tabs"
            items={tabs}
            classNames={{
              tabList: "  borderb py-2",
              cursor: " bg-btnColor",
            }}
            selectedKey={selectedKey}
            onSelectionChange={handleTabClick}
          >
            {(item) => (
              <Tab key={item.id} title={item.label} className="" tabIndex={-1}>
                <div
                  className={` grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 gap-12`}
                >
                  {Array.isArray(item.content) &&
                    item.content.map((paragraph, index) => (
                      <div
                        key={index}
                        className={`
                          ${
                            index === item.content.length - 1 &&
                            item.content.length % 2 === 1
                              ? "col-span-2"
                              : item.label === "Profile"
                                ? "col-span-2 md:col-span-1"
                                : ""
                          }
                          text-center font-bold text-[13px] font-helvetica
                          `}
                      >
                        {paragraph}
                      </div>
                    ))}
                </div>
              </Tab>
            )}
          </Tabs>
        ) : null}
      </div>

      {isDrawerOpen && (
        <SocialInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}

      {/* upload profile picture */}
      <Modal
        open={openPictureModal}
        onCancel={handleClosePictureModal}
        footer={[
          <div className="flex justify-end py-3" key={1}>
            <button
              type="submit"
              className="bg-btnColor px-6 py-2 header_h3 outline-none flex gap-2 text-white rounded hover:bg-btnColor/70 items-center"
              onClick={saveProfilePicture}
            >
              {isLoading ? <Spinner color="default" size="sm" /> : null}
              Upload Profile Picture
            </button>
          </div>,
        ]}
      >
        <div className="flex justify-center">
          <Avatar
            src={previewImage}
            alt="preview image"
            className="h-48 w-48 rounded-full"
          ></Avatar>
        </div>
      </Modal>

      <FileModal />
    </>
  );
}
