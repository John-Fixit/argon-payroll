/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Profile from "../../components/ProfileInformation/Profile";
import SideContents from "../../components/ProfileInformation/SideContents";
import PersonalInformation from "../../components/ProfileInformation/PersonalInformation";
import { useViewStaffProfile } from "../../API/profile";
import { useParams } from "react-router-dom";
import OfficialInformation from "../../components/ProfileInformation/OfficialInformation";
import OfficialEditform from "../../components/ProfileInformation/OfficialEditform";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import Attachments from "../../components/Request&FormComponent/Attachments";
import Note from "../../components/Request&FormComponent/Note";
import Drawer from "../../components/Request&FormComponent/Drawer";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useSaveToEditInformation } from "../../components/Leave/Hooks";
import Experience from "./Experience";
import Academics from "./Academics";
import Certification from "./Certification";
import { useForm } from "react-hook-form";
import { useUpdateOfficial } from "../../API/officials";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const ProfileDetails = () => {
  const { userData } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState(720);
  const [drawerHeader, setDrawerHeader] = useState({});
  const [submittingForm, setSubmittingForm] = useState(false);
  const [officialInformation, setOfficialInformation] = useState({
    employment_type: "",
    current_appointment_date: "",
    region: "",
    pension_no: "",
    pension_company: "",
    directorate: "",
    department: "",
    unit: "",
    designation: "",
    grade: "",
    step: "",
    notes: "",
    attachments: "",
  });

  const { mutate } = useUpdateOfficial();

  const { staff_id } = useParams();
  const { data, isLoading } = useViewStaffProfile(staff_id);
  const { keepEditData } = useSaveToEditInformation();

  const [tabs, setTabs] = useState([
    { title: "Form" },
    {
      title: "Attachment",
    },
    { title: "Note" },
  ]);

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  useEffect(() => {
    if (whatTodo.toLowerCase() == "edit".toLowerCase()) {
      if (tabs[selectedTab].title.toLowerCase() == "form".toLowerCase()) {
        setDrawerHeader({
          title: "Update Information",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Attachment".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Attachment",
          description: "Add your attachment",
        });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Note".toLowerCase()
      ) {
        setDrawerHeader({ title: "Note", description: "Add a note" });
      }
    }
  }, [tabs, selectedTab, whatTodo]);

  const editInfo = () => {
    setWhatTodo("edit");
    setTabs([
      { title: "Form" },
      {
        title: "Attachment",
      },
      { title: "Note" },
    ]);
    setDrawerWidth(720);
    setSideBarNeeded(true);
    setIsOpen(true);
  };

  useEffect(() => {
    keepEditData({
      department: {
        value: data?.BIODATA.DEPARTMENT_ID,
        label: data?.BIODATA.DEPARTMENT,
      },
      directorate: {
        value: data?.BIODATA.DIRECTORATE_ID,
        label: data?.BIODATA.DIRECTORATE,
      },
      unit: {
        value: data?.BIODATA.UNIT_ID,
        label: data?.BIODATA.UNIT,
      },
      current_appointment_date: {
        value: data?.BIODATA.CURRENT_APPOINTMENT_ID,
        label: data?.BIODATA.CURRENT_APPOINTMENT_DATE,
      },
      employment_type: {
        label: data?.BIODATA.EMPLOYEE_ID,
        value: data?.BIODATA.EMPLOYEE_TYPE,
      },
      region: {
        label: data?.BIODATA.REGION_ID,
        value: data?.BIODATA.REGION_OFFICE,
      },
      pension_company: data?.BIODATA.PENSION_NAME,
      designation: data?.BIODATA.DESIGNATION,
      grade: { label: data?.BIODATA.GRADE, value: data?.BIODATA.GRADE },
      step: { label: data?.BIODATA.STEP, value: data?.BIODATA.STEP },
    });
  }, [data, keepEditData]);

  const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,

      preview_staff_id: staff_id,
      directorate: data?.BIODATA.DIRECTORATE,
      department: data?.BIODATA.DEPARTMENT,
    },
  });

  const onSubmit = () => {
    const payload = getValues();
    setSubmittingForm(true);
    mutate(
      { ...payload, package_id: data?.PACKAGE_ID?.official },
      {
        onSuccess: (data) => {
          successToast(data?.data?.data?.message);
          setSubmittingForm(false);
          reset();
          setIsOpen(false);
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message ?? err?.message);
        },
      },
    );
  };
  return (
    <div>
      {" "}
      <div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            <div className="md:col-span-4 flex flex-col gap-6">
              <Profile
                profile_picture={data?.PROFILE_PICTURE?.FILE_NAME}
                isLoading={isLoading}
                personal_information={{ ...data?.BIODATA, staff_id }}
                contact_information={data?.CONTACT_INFORMATION}
                can_edit_official={data?.CAN_EDIT_OFFICIAL}
              />
              {isLoading ? (
                <div className="space-y-3">
                  <Table
                    topContent={
                      <Skeleton className="h-5 w-[13rem] rounded-lg" />
                    }
                  >
                    <TableHeader>
                      {Array.from(Array(6).keys()).map((item) => (
                        <TableColumn key={item}>
                          <Skeleton className="h-3 w-3/5 rounded-lg" />
                        </TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {Array.from(Array(6).keys()).map((item) => (
                        <TableRow key={item}>
                          {Array.from(Array(6).keys()).map((item) => (
                            <TableCell key={item}>
                              <Skeleton className="h-3 w-3/6 rounded-lg" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <>
                  <Academics
                    academics={data?.ACADEMICS}
                    isLoading={isLoading}
                    can_edit_official={data?.CAN_EDIT_OFFICIAL}
                  />
                  <Certification
                    certification={data?.CERTIFICATIONS}
                    isLoading={isLoading}
                    can_edit_official={data?.CAN_EDIT_OFFICIAL}
                  />
                  <Experience
                    experiences={data?.EXPERIENCE}
                    isLoading={isLoading}
                    can_edit_official={data?.CAN_EDIT_OFFICIAL}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col gap-6 md:col-span-2">
              <div className="relative flex flex-col min-w-0 rounded-lg break-words border bg-white shadow">
                <OfficialInformation
                  editInfo={editInfo}
                  information={data}
                  isLoading={isLoading}
                />
              </div>

              <div className=" rounded-lg break-words border bg-white shadow">
                <PersonalInformation
                  isLoading={isLoading}
                  personal_information={{ ...data?.BIODATA, staff_id }}
                  can_edit_official={data?.CAN_EDIT_OFFICIAL}
                />
              </div>
              {/* <!-- end card --> */}
            </div>
          </div>
        </div>

        <Drawer
          drawerWidth={drawerWidth}
          isOpen={isOpen}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          sideBarNeeded={sideBarNeeded}
          setIsOpen={setIsOpen}
          header={drawerHeader}
          tabs={tabs}
        >
          {whatTodo == "edit" && (
            <div>
              {tabs[selectedTab].title.toLowerCase() ==
                "form".toLowerCase() && (
                <OfficialEditform
                  goToNextTab={goToNextTab}
                  handleSubmit={handleSubmit}
                  setIsOpen={setIsOpen}
                  trigger={trigger}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  getValues={getValues}
                  register={register}
                  control={control}
                  reset={reset}
                  staff_id={staff_id}
                  officialInformation={officialInformation}
                  setOfficialInformation={setOfficialInformation}
                />
              )}
              {tabs[selectedTab].title.toLowerCase() ==
                "Attachment".toLowerCase() && (
                <Attachments
                  setInformation={setOfficialInformation}
                  token={userData?.token}
                  setValue={setValue}
                  goToNextTab={goToNextTab}
                />
              )}
              {tabs[selectedTab].title.toLowerCase() ==
                "Note".toLowerCase() && (
                <Note
                  setValue={setValue}
                  handleSubmit={onSubmit}
                  isLoading={submittingForm}
                  setInformation={setOfficialInformation}
                  goToNextTab={goToNextTab}
                />
              )}
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default ProfileDetails;
