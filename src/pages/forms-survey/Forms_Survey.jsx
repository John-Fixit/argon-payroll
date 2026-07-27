import { useMemo, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import PageHeader from "../../components/payroll_components/PageHeader";
import { useGetAwaitingPerformance } from "../../API/performance";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { GiCycle } from "react-icons/gi";
import ActionIcons from "../../components/core/shared/ActionIcons";
import ViewFormTemplate from "../../components/core/forms&survey/ViewFormTemplate";
import Separator from "../../components/payroll_components/Separator";
import RequestCard from "../Approval/RequestCard";
import { FaFirstdraft } from "react-icons/fa6";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

const statusData = [
  {
    id: "draft",
    label: "Draft",
    icon: FaFirstdraft,
    b_color: "bg-purple-100",
    t_color: "text-purple-600",
  },
  {
    id: "pending",
    label: "Pending",
    icon: MdOutlinePending,
    b_color: "bg-amber-100",
    t_color: "text-amber-600",
  },

  {
    id: "approved",
    label: "Approved",
    icon: AiOutlineFileDone,
    b_color: "bg-green-100",
    t_color: "text-green-600",
  },
];

const Forms_Survey = () => {
  const [templateAction, setTemplateAction] = useState({
    state: false,
    template: null,
    type: null,
  });

  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const rowsPerPage = 20;

  const { userData } = useCurrentUser();

  const [detailsStatus, setDetailsStatus] = useState("pending");

  const { data: get_forms, isPending: isLoadingForm } =
    useGetAwaitingPerformance({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      status: detailsStatus || "pending",
    });
  const { data: get_pending } = useGetAwaitingPerformance({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    status: "pending",
  });
  const { data: get_draft } = useGetAwaitingPerformance({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    status: "draft",
  });
  const { data: get_approved } = useGetAwaitingPerformance({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
    status: "approved",
  });

  const form_list = useMemo(() => get_forms || [], [get_forms]);

  /* ------------- sorting ----------------------------------------- */
  const sorted = useMemo(() => {
    const sorted = [...form_list].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      let cmp = 0;
      if (first > second) cmp = 1;
      else if (first < second) cmp = -1;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [form_list, sortDescriptor]);

  /* ------------- pagination -------------------------------------- */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  const handleAction = (type, template) => {
    setTemplateAction({ state: true, template: template, type: type });
  };

  const closeTemplateAction = () => {
    setTemplateAction({ state: false, template: null, type: null });
  };

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value === "draft") return get_draft;
    else if (value === "pending") return get_pending;
    else if (value === "approved") return get_approved;
  };

  return (
    <>
      <main>
        <PageHeader
          header_text={"Form & Survey"}
          breadCrumb_data={[
            { name: "HR" },
            { name: "Self service" },
            { name: "Form & Survey" },
          ]}
        />

        <div className="mb-6">
          <Separator separator_text={""} />
          <RequestCard
            requestHistory={statusData}
            selectTab={selectTab}
            requestStatus={detailsStatus}
            requestNo={detailsNo}
            // allowNull={true}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Table
            aria-label="form cycleList"
            isHeaderSticky
            classNames={{
              wrapper: "maxh-[calc(100vh-280px)] shadow-lg rounded-xl",
            }}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            bottomContent={
              pages > 1 && (
                <div className="flex w-full justify-center py-4">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(p) => setPage(p)}
                  />
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn key="name" allowsSorting>
                Form Title
              </TableColumn>
              {/* <TableColumn key="description">Destination</TableColumn> */}
              <TableColumn key="sections" allowsSorting className="text-center">
                Start Date
              </TableColumn>
              <TableColumn
                key="questions"
                allowsSorting
                className="text-center"
              >
                End Date
              </TableColumn>
              <TableColumn key="createdBy">Created By</TableColumn>
              <TableColumn key="lastModified" allowsSorting>
                Date Created
              </TableColumn>

              <TableColumn width={50}>Actions</TableColumn>
            </TableHeader>

            <TableBody
              items={items}
              loadingContent={<Spinner />}
              loadingState={isLoadingForm}
            >
              {(item) => (
                <TableRow
                  key={item.ID}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GiCycle className="text-primary/80" size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {item?.TEMPLATE_TITLE}
                      </span>
                    </div>
                  </TableCell>

                  {/* <TableCell className="">{item?.RECIPIENT_TYPE}</TableCell> */}

                  <TableCell className="text-center">
                    {new Date(item?.START_DATE).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(item?.END_DATE).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="">
                    {item?.FIRST_NAME} {item?.LAST_NAME}
                  </TableCell>

                  <TableCell>
                    {new Date(item?.DATE_CREATED).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <ActionIcons
                        variant={"VIEW"}
                        action={() => handleAction("VIEW", item)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>

        {templateAction.state && (
          <ViewFormTemplate
            isOpenViewTemplate={templateAction.state}
            closeViewTemplate={closeTemplateAction}
            template={templateAction.template}
            actionType={templateAction.type}
            selectedStatus={detailsStatus}
          />
        )}
      </main>
    </>
  );
};

export default Forms_Survey;
