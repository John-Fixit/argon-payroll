/* eslint-disable no-unused-vars */
// import { ImFilePdf } from "react-icons/im";
import { DownloadIcon } from "lucide-react";

import { Avatar, Button, cn, Pagination } from "@nextui-org/react";

import { useEffect, useMemo, useState } from "react";

import Drawer from "../../../components/Request&FormComponent/Drawer";
import AnnouncementForm from "./components/AnnouncementForm";
import Attachments from "../../../components/Request&FormComponent/Attachments";
import {
  useDeleteAnnouncement,
  useGetAnouncement,
  useSaveAnnouncement_One,
} from "../../../API/announcement.js";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Label from "../../../components/forms/FormElements/Label.jsx";
import { DatePicker } from "antd";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { file_Prefix } from "../../../API/leave.js";

import { CgFileAdd } from "react-icons/cg";
import { BsFiletypeDoc, BsFiletypeDocx } from "react-icons/bs";
import {
  GrDocumentCsv,
  GrDocumentExcel,
  GrDocumentZip,
  GrFormView,
} from "react-icons/gr";
import { filePrefix } from "../../../utils/filePrefix.js";
import { PiFileXlsBold } from "react-icons/pi";
import { TbFileTypePdf } from "react-icons/tb";
import propTypes from "prop-types";
import AnnounceShimmer from "../../home/centerFeed/AnnounceShimmer.jsx";
import useFileModal from "../../../hooks/useFileModal.jsx";
import FileModal from "../../../components/profile/FileModal.jsx";
import { downloadFile } from "../../../utils/utitlities.js";
import { errorToast, successToast } from "../../../utils/toastMsgPop.js";
import { useSaveAnnouncement } from "../../../components/Leave/Hooks.js";
import { FaRegTrashCan } from "react-icons/fa6";
import ConfirmDeleteModal from "../../../components/core/shared/ConfirmDelete.jsx";
import { useLocation } from "react-router-dom";

const Announcement = ({ fromUser }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [drawerHeader, setDrawerHeader] = useState({
    title: "Announcement",
    description: "Create announcement",
  });

  const location = useLocation().pathname;
  const { userData } = useCurrentUser();

  const {
    information: announcementInfo,
    keepAnnoucementData,
    clearData,
  } = useSaveAnnouncement();

  const [announcement, setAnnouncement] = useState({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: "",
    end_date: "",
    subject: "",
    message: "",
    attachment: "",
    document_type: "",
  });
  const [page, setPage] = useState(1);

  const [tabs, setTabs] = useState([
    { title: "Announcement", sub: "create announcement" },
    {
      title: "Attachments",
      sub: "Upload ",
    },
  ]);
  const {
    data: announcementData,
    isPending,
    refetch,
  } = useGetAnouncement({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    start_date: dates.start_date,
    end_date: dates.end_date,
  });

  const { openModal } = useFileModal();

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  useEffect(() => {
    if (tabs[selectedTab].title.toLowerCase() == "Announcement".toLowerCase()) {
      setDrawerHeader({
        title: "Announcement",
        description: "Create announcement",
      });
    } else if (
      tabs[selectedTab].title.toLowerCase() == "Attachments".toLowerCase()
    ) {
      setDrawerHeader({
        title: "Attachments",
        description: "Add your attachments",
      });
    }
  }, [tabs, selectedTab]);

  useEffect(() => {
    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: dates.start_date,
      end_date: dates.end_date,
    };
    queryClient.invalidateQueries(payload);
  }, [dates, queryClient, userData]);

  const handleFromDateChange = (date) => {
    if (!date) {
      setDates((prev) => {
        return { ...prev, start_date: "" };
      });
    }
    setDates((prev) => {
      return { ...prev, start_date: moment(date).format("YYYY-MM-DD") };
    });
  };

  const handleToDateChange = (date) => {
    if (!date) {
      setDates((prev) => {
        return { ...prev, end_date: "" };
      });
    }
    setDates((prev) => {
      return { ...prev, end_date: moment(date).format("YYYY-MM-DD") };
    });
  };

  const handleFormatData = (date) => {
    const datetime = new Date(date);

    const optionsDate = { year: "numeric", month: "long", day: "numeric" };
    let formattedDate = datetime.toLocaleDateString("en-US", optionsDate);

    const day = datetime.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    const fixed = formattedDate.replace(day, `${day}${suffix}`);
    // console.log(formattedDate,fixed)
    return fixed;
  };

  const handleFormatTime = (time) => {
    const datetime = new Date(time);
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = datetime.toLocaleTimeString("en-US", optionsTime);
    return formattedTime;
  };
  const submitForm = () => {};

  const ann_image = (file) => {
    return file.startsWith(file_Prefix) ? file : `${file_Prefix}${file}`;
  };

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return (
      Math.ceil(announcementData?.data?.data?.length / rowsPerPage) || null
    ); // total divided by row-per-page
  }, [announcementData?.data?.data]);

  const items = useMemo(() => {
    //item stand for item to show
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (announcementData?.data?.data?.length) {
      return announcementData?.data?.data?.slice(start, end) || [];
    } else {
      return [];
    }
  }, [page, announcementData?.data?.data, rowsPerPage]);

  const { mutate: saveAnnouncement } = useSaveAnnouncement_One();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (attachmentFromChild) => {
    if (
      announcement.document_type == "" ||
      announcement.start_date == "" ||
      announcement.end_date == "" ||
      announcement.message == ""
    ) {
      errorToast("Important fields must be filled");
    } else {
      const finalAnnouncement = {
        ...announcement,
        attachment: attachmentFromChild || announcement.attachment,
      };
      setLoading(true);
      saveAnnouncement(finalAnnouncement, {
        onSuccess: (data) => {
          // console.log(data);
          setLoading(false);
          successToast(data?.data?.message);
          clearData();
          setAnnouncement((info) => {
            return {
              ...info,
              document_type: null,
              start_date: "",
              end_date: "",
              attachment: null,
              message: "",
              subject: "",
            };
          });
          refetch();
          setIsOpen(false);
        },
        onError: (error) => {
          setLoading(false);
          errorToast(error?.response?.data?.message);
        },
      });
    }
  };

  const {
    mutateAsync: mutateDeleteAnnouncement,
    isPending: isDeletingAnnouncement,
  } = useDeleteAnnouncement();

  const [openConfirmModal, setOpenConfirmModal] = useState({
    state: false,
    announcement_id: null,
  });

  const openDeleteModal = (id) => {
    setOpenConfirmModal({ state: true, announcement_id: id });
  };

  const closeDeleteModal = (id) => {
    setOpenConfirmModal({ state: false });
  };

  const deleteAnnouncement = () => {
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      announcement_id: openConfirmModal?.announcement_id,
    };
    try {
      const res = mutateDeleteAnnouncement(json);
      successToast(res?.data?.message || "Announcement deleted successfully");
      closeDeleteModal();
    } catch (err) {
      const errmsg = err?.response?.data?.message;
      errorToast(errmsg);
    }
  };

  return (
    <div className="max-w-full flex flex-col justify-center overflow-hidden px-2 mb-5">
      <Drawer
        handleSubmit={submitForm}
        sideBarNeeded={sideBarNeeded}
        // drawerWidth={drawerWidth}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        header={drawerHeader}
        tabs={tabs}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div
          className={
            tabs[selectedTab].title.toLowerCase() === "announcement"
              ? ""
              : "hidden"
          }
        >
          <AnnouncementForm
            information={announcement}
            setInformation={setAnnouncement}
            reload={refetch}
            handleSubmit={handleSubmit}
          />
        </div>

        <div
          className={
            tabs[selectedTab].title.toLowerCase() === "attachments"
              ? ""
              : "hidden"
          }
        >
          <Attachments
            setInformation={setAnnouncement}
            information={announcement}
            token={userData?.token}
            setSelectedTab={setSelectedTab}
            handleSubmit={handleSubmit}
            isSubmitting={loading}
            isAnnouncement={true}
          />
        </div>
      </Drawer>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px_1fr] gap-4 w-full">
        <div
          className={cn(
            fromUser ? "lg:col-span-3" : "lg:col-span-2",
            "flex flex-col gap-4"
          )}
        >
          <div className={cn("bg-lighten", { hidden: fromUser })}>
            <div className="bg-white rounded-xl py-4 ">
              <div className="px-9 text-gray-500">
                <div className="flex w-full flex-wrap gap-y-2 justify-between items-center gap-x-4">
                  <span className="text-lg font-bold font-helvetica uppercase">
                    All Notices
                  </span>
                  <div>
                    <Button
                      onClick={() => setIsOpen(true)}
                      className="font-helvetica bg-btnColor text-white font-semibold"
                    >
                      <CgFileAdd size={20} /> <span>New</span>
                      <span className="sm:block hidden">Announcement</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              fromUser ? "hidden" : "lg:hidden flex flex-col gap-4"
            )}
          >
            <div className="bg-white rounded-xl overflow-clip shadow-sm">
              <div className="px-4 text-gray-500 ">
                <div className="flex flex-wrap  justify-between items-center gap-x-4">
                  <div className="mt-2">
                    <span className="text-lg font-bold font-helvetica">
                      Filters
                    </span>
                  </div>

                  <div className="flex flex-col flex-wrap gap-2 md:flex-row my-2">
                    <div className="flex gap-2 my-2">
                      <div className="">
                        <Label>From</Label>
                        <DatePicker
                          onChange={(e) => handleFromDateChange(e?.$d)}
                          className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                        />
                      </div>

                      <div className="">
                        <Label htmlFor="to">To</Label>
                        <DatePicker
                          onChange={(e) => handleToDateChange(e?.$d)}
                          className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-10 mb-5">
            {isPending || items?.length === 0 ? (
              <AnnounceShimmer />
            ) : (
              items?.map((announcement, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl py-5 overflow-clip shadow w-full"
                >
                  <div className="flex justify-between gap-3 items-center px-[1.8rem] h-[4rem] border-b">
                    <div className="flex  gap-3  ">
                      <div className=" overflow-hidden  h-10  flex items-end ">
                        <Avatar name={announcement.FIRST_NAME} isBordered />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-gray-600 text-sm">
                          {announcement.LAST_NAME} {announcement.FIRST_NAME}
                        </span>
                        <span className=" text-gray-500 text-sm">
                          {moment(announcement?.DATE_CREATED).fromNow()}
                        </span>
                      </div>
                    </div>
                    <div>
                      {location === "/people/hr/announcement" && (
                        <Button
                          isIconOnly
                          color="danger"
                          size="sm"
                          onPress={() =>
                            openDeleteModal(announcement?.ANNOUNCEMENT_ID)
                          }
                        >
                          <FaRegTrashCan size={20} />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="">
                    {
                      //  !announcement?.ANNOUNCEMENT_FILE?.includes("pdf") &&
                      (announcement?.ANNOUNCEMENT_FILE ||
                        announcement.FILE_NAME) &&
                      (announcement?.ANNOUNCEMENT_FILE?.includes("jpg") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("jpeg") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("png") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("JPG") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("GIF") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("JPEG") ||
                        announcement?.ANNOUNCEMENT_FILE?.includes("gif") ||
                        announcement?.FILE_NAME?.includes("jpg") ||
                        announcement?.FILE_NAME?.includes("jpeg") ||
                        announcement?.FILE_NAME?.includes("png") ||
                        announcement?.FILE_NAME?.includes("JPG") ||
                        announcement?.FILE_NAME?.includes("GIF") ||
                        announcement?.FILE_NAME?.includes("JPEG") ||
                        announcement?.FILE_NAME?.includes("gif") ||
                        announcement?.FILE_NAME?.includes("PNG")) ? (
                        <div className="relative group w-full">
                          <img
                            src={ann_image(
                              announcement?.ANNOUNCEMENT_FILE?.includes(
                                "pdf"
                              ) && announcement.FILE_NAME
                                ? announcement.FILE_NAME
                                : announcement.ANNOUNCEMENT_FILE ||
                                    announcement.FILE_NAME
                            )}
                            className="max-h-[500px] w-full"
                            alt={
                              announcement.ANNOUNCEMENT_FILE ||
                              announcement.FILE_NAME
                            }
                          />

                          <div className="z-4 hidden absolute group-hover:block  bg-black h-full w-full top-0 opacity-20"></div>

                          <div
                            className="p-1  transition-all duration-200 rounded-full cursor-pointer lightbtn left-[51%] bottom-[50%]  z-10  hidden absolute group-hover:block shadow-lg"
                            onClick={() =>
                              openModal(
                                announcement?.ANNOUNCEMENT_FILE ||
                                  announcement.FILE_NAME
                              )
                            }
                          >
                            <GrFormView
                              className=" z-2 p-1 text-white "
                              strokeWidth={1}
                              size={40}
                            />
                          </div>
                          <div
                            className="p-1  transition-all duration-200 rounded-full cursor-pointer lightbtn left-[41%] bottom-[50%]  z-10  hidden absolute group-hover:block shadow-lg"
                            onClick={() =>
                              downloadFile(
                                announcement?.ANNOUNCEMENT_FILE?.includes(
                                  "http"
                                ) || announcement.FILE_NAME?.includes("http")
                                  ? announcement.ANNOUNCEMENT_FILE ||
                                      announcement.FILE_NAME
                                  : announcement.ANNOUNCEMENT_FILE
                                  ? filePrefix + announcement.ANNOUNCEMENT_FILE
                                  : filePrefix + announcement.FILE_NAME,

                                announcement?.ANNOUNCEMENT_FILE ||
                                  announcement.FILE_NAME,
                                announcement.ANNOUNCEMENT_FILE ||
                                  announcement.FILE_NAME
                              )
                            }
                          >
                            <DownloadIcon
                              className=" z-2 p-2 text-white "
                              strokeWidth={2}
                              size={40}
                            />
                          </div>
                        </div>
                      ) : (
                        (announcement?.ANNOUNCEMENT_FILE?.includes("pdf") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes("doc") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes("csv") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes("docx") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes("zip") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes("xls") ||
                          announcement?.ANNOUNCEMENT_FILE?.includes(
                            "xlsx"
                          )) && (
                          <div className="flex gap-2  px-7 py-4">
                            <div className="flex shadow-md px-4 py-4 rounded-2xl border gap-2 items-center group hover:shadow-lg">
                              <div
                                onClick={
                                  !announcement?.ANNOUNCEMENT_FILE?.includes(
                                    "xls"
                                  ) &&
                                  !announcement?.ANNOUNCEMENT_FILE?.includes(
                                    "xlsx"
                                  )
                                    ? () =>
                                        openModal(
                                          announcement?.ANNOUNCEMENT_FILE
                                        )
                                    : () =>
                                        downloadFile(
                                          announcement?.ANNOUNCEMENT_FILE?.includes(
                                            "http"
                                          )
                                            ? announcement.ANNOUNCEMENT_FILE
                                            : filePrefix +
                                                announcement.ANNOUNCEMENT_FILE,
                                          announcement?.ANNOUNCEMENT_FILE
                                        )
                                }
                                className="flex gap-2 items-center cursor-pointer"
                              >
                                <span>
                                  {announcement?.ANNOUNCEMENT_FILE.includes(
                                    "pdf"
                                  ) ? (
                                    <TbFileTypePdf
                                      size={25}
                                      className="text-red-500"
                                    />
                                  ) : announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "doc"
                                    ) ? (
                                    <BsFiletypeDoc
                                      size={25}
                                      className="text-blue-500"
                                    />
                                  ) : announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "docx"
                                    ) ? (
                                    <BsFiletypeDocx
                                      size={25}
                                      className="text-blue-500"
                                    />
                                  ) : announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "csv"
                                    ) ? (
                                    <GrDocumentCsv
                                      size={25}
                                      className="text-blue-500"
                                    />
                                  ) : announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "xls"
                                    ) ? (
                                    <PiFileXlsBold
                                      size={25}
                                      className="text-red-500"
                                    />
                                  ) : announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "xlsx"
                                    ) ? (
                                    <GrDocumentExcel
                                      size={25}
                                      className="text-red-500"
                                    />
                                  ) : (
                                    announcement?.ANNOUNCEMENT_FILE?.includes(
                                      "zip"
                                    ) && (
                                      <GrDocumentZip
                                        size={25}
                                        className="text-blue-500"
                                      />
                                    )
                                  )}
                                </span>
                                <span className="flex-1 line-clamp-1 ">
                                  {announcement?.ANNOUNCEMENT_FILE}
                                </span>
                              </div>
                              <div className=" flex  justify-end py-1">
                                <DownloadIcon
                                  onClick={() =>
                                    downloadFile(
                                      announcement?.ANNOUNCEMENT_FILE?.includes(
                                        "http"
                                      )
                                        ? announcement.ANNOUNCEMENT_FILE
                                        : filePrefix +
                                            announcement.ANNOUNCEMENT_FILE,
                                      announcement?.ANNOUNCEMENT_FILE
                                    )
                                  }
                                  className=" z-2 p-1  group-hover:text-black/50 group-hover:border-black/40 group-hover:border-2 border rounded-full border-gray-300 text-gray-400/80 cursor-pointer "
                                  strokeWidth={2}
                                  size={23}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )
                    }

                    <div className="w-full  flex flex-wrap flex-col pt-4 space-y-3 px-[1.8rem]">
                      <div>
                        <b>{announcement.SUBJECT}</b>
                      </div>
                      <p
                        className="break-words whitespace-pre-wrap overflow-hidden"
                        dangerouslySetInnerHTML={{
                          __html: announcement.MESSAGE,
                        }}
                      />
                    </div>
                    <div className="mt-10 flex justify-between px-[1.8rem]">
                      <span className="text-sm text-gray-400">
                        {handleFormatData(announcement.DATE_CREATED)}{" "}
                        {handleFormatTime(announcement.DATE_CREATED)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className={cn(fromUser ? "hidden" : "hidden lg:flex flex-col gap-4")}
        >
          <div className="bg-white rounded-xl overflow-clip shadow-sm">
            <div className="px-4 text-gray-500 ">
              <div className="flex flex-wrap  justify-between items-center gap-x-4">
                <div className="mt-2">
                  <span className="text-lg font-bold font-helvetica">
                    Filters
                  </span>
                </div>

                <div className="flex flex-col flex-wrap gap-2 md:flex-row my-2">
                  <div className="flex gap-2 my-2 flex-wrap ">
                    <div className=" max-w-[150px]">
                      <Label>From</Label>
                      <DatePicker
                        onChange={(e) => handleFromDateChange(e.$d)}
                        className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none"
                      />
                    </div>

                    <div className="max-w-[150px]">
                      <Label htmlFor="to">To</Label>
                      <DatePicker
                        onChange={(e) => handleToDateChange(e.$d)}
                        className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isPending && pages && items?.length > 0 && (
        <div className="py-2 px-2 mx-5 flex justify-between items-center">
          <Pagination
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="default"
            page={page}
            total={pages}
            initialPage={1}
            variant="light"
            onChange={setPage}
          />
        </div>
      )}

      {/* <CreateAnnouDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />



      <CreateAnouncementPopup
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      /> */}
      <FileModal />

      <ConfirmDeleteModal
        isOpen={openConfirmModal.state}
        handleCancel={closeDeleteModal}
        handleOk={deleteAnnouncement}
        loading={isDeletingAnnouncement}
      />
    </div>
  );
};

Announcement.propTypes = {
  fromUser: propTypes.bool,
};

export default Announcement;
