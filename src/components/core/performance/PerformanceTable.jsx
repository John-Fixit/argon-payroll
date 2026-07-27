import {
  cn,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import ActionIcons from "../shared/ActionIcons";
import moment from "moment";
import PropTypes from "prop-types";
import StarLoader from "../loaders/StarLoader";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import { useDeleteAper } from "../../../API/performance";

const PerformanceTable = ({
  tableData,
  handleViewAper,
  tableStatus,
  viewIndex,
  isPending,
  role,
  selectedYear,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const is_hris = role === "hris";

  const { mutateAsync: mutateDeleteAper } = useDeleteAper(selectedYear);

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const tableHead = [
    is_hris && {
      name: "APPRAISEE",
      key: "APPRAISEE",
    },
    {
      name: "START DATE",
      key: "date_from",
      isDate: true,
    },
    {
      name: "END DATE",
      key: "date_to",
      isDate: true,
    },
    tableStatus !== "pending" &&
      tableStatus !== "draft" && {
        name: "AVERAGE SCORE",
        key: "average_score",
        isNumber: true,
      },
    is_hris &&
      tableStatus !== "completed" && {
        name: "STAGE",
        key: "aper_stage",
      },
    {
      name: "ACTION",
      key: "action",
    },
  ]?.filter(Boolean);

  const { confirm } = Modal;

  const handleDeleteAper = (aper) => {
    confirm({
      title: "Are sure to delete these Aper?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk: async () => {
        try {
          const json = {
            request_id: aper?.request_id,
          };
          const res = await mutateDeleteAper(json);
          successToast(res?.data?.message);
        } catch (err) {
          const errMsg = err?.response?.data?.message || err?.message;
          errorToast(errMsg);
        }
      },
    });
  };
  return (
    <div>
      <Table
        aria-label="Attendance Table"
        isHeaderSticky
        isStriped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          {tableHead?.map((head, index) => (
            <TableColumn key={index + "_____table_head"}>
              {head?.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center text-2xl">
              {" "}
              Empty data
            </div>
          }
        >
          {tableData?.map((record, i) => (
            <TableRow key={i}>
              {tableHead?.map((head, index) => (
                <TableCell
                  key={index + "_____table_head"}
                  align={head?.key === "action" && "center"}
                  className={cn("text-default-500")}
                >
                  {head?.isDate ? (
                    moment(record?.[head?.key]).format("DD MMM YYYY")
                  ) : head?.isNumber ? (
                    record?.[head?.key]?.toFixed(2)
                  ) : head?.key === "action" ? (
                    <div className="flex ">
                      <div className="pl-4 flex items-center">
                        {viewIndex === i && isPending ? (
                          <StarLoader size={20} />
                        ) : (
                          <>
                            {/* {record?.aper_stage === "draft" ? (
                              <ActionIcons
                                variant={"EDIT"}
                                action={() =>
                                  handleViewAper({ ...record, is_draft: 1 }, i)
                                }
                              />
                            ) : null} */}
                            <ActionIcons
                              variant={"VIEW"}
                              action={() => handleViewAper(record, i)}
                            />
                            {is_hris && (
                              <ActionIcons
                                variant={"DELETE"}
                                action={() => handleDeleteAper({ ...record })}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {record?.[head?.key]}
                      {is_hris && head?.key === "APPRAISEE" && (
                        <p className="text-gray-400 text-xs">
                          {record?.STAFF_NUMBER}
                        </p>
                      )}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex mt-4">
        <Pagination
          total={pages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

PerformanceTable.propTypes = {
  tableData: PropTypes.array,
  handleViewAper: PropTypes.func,
  tableStatus: PropTypes.string,
  viewIndex: PropTypes.number,
  isPending: PropTypes.bool,
  role: PropTypes.string,
  selectedYear: PropTypes.any,
};

export default PerformanceTable;
