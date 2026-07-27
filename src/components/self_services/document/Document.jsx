import { useGetProfile } from "../../../API/profile";
import { API_URL } from "../../../API/api_urls/api_urls";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Spinner,
} from "@nextui-org/react";
import useFileModal from "../../../hooks/useFileModal";
import { MdOutlineCloudDownload } from "react-icons/md";
import CircularLoader from "../../core/loaders/circularLoader";

const Document = () => {
  const { openModal } = useFileModal();

  const { data: getDocument, isLoading } = useGetProfile({
    path: API_URL.get_documents,
  });

  let documentData = getDocument?.data ?? [];

  return (
    <>
      <div className=" flex flex-col py-10">
        {
          isLoading ? (
            <div className="flex items-center justify-center">
              <CircularLoader />
            </div>
          ): (
        <Table
          isStriped
          aria-label="Attendance Table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            <TableColumn className="font-helvetica text-black text-[0.80rem] opacity-80">
              SOURCE
            </TableColumn>
            <TableColumn className="font-helvetica text-black text-[0.80rem] opacity-80">
              SUBJECT
            </TableColumn>
            <TableColumn className="font-helvetica text-black text-[0.80rem] opacity-80">
              ACTION
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="flex items-center justify-center text-xl">
                {" "}
                Empty data
              </div>
            }
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner color="default" />
              </div>
            ) : (
              documentData?.length &&
              documentData?.map((document, index) => (
                <TableRow key={index + "documents____"}>
                  <TableCell>
                    <div className="lg:w-60 md:w-60 w-44 text-sm text-default-400">
                      <ol className="relative w-full ms-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        {document?.DESIGNATION_NAME ? (
                          <li className="ms-5">
                            <span className="absolute w-[8px] h-[8px] border-2 border-btnColor bg-white rounded-full -start-[5px]"></span>
                            <h3 className="font-medium leading-tight font-helvetica text-xs uppercase text-black opacity-75">
                              {document?.DESIGNATION_NAME ?? "NIL"}
                            </h3>
                          </li>
                        ) : null}
                        <li className="ms-5">
                          <span className="absolute w-[8px] h-[8px] border-2 border-btnColor bg-white rounded-full -start-[5px]"></span>
                          <div className="flex items-center mt-3 font-helvetica text-xs uppercase opacity-70">
                            <p className="font-helvetica">
                              {document?.DEPARTMENT_NAME ?? "NIL"}
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="lg:w-60 md:w-48 w-40 font-helvetica text-xs uppercase opacity-55">
                      {document?.SUBJECT ?? "NIL"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() =>
                        openModal(
                          document?.FILE_NAME !== ""
                            ? document?.FILE_NAME
                            : document?.ANNOUNCEMENT_FILE
                        )
                      }
                    >
                      <MdOutlineCloudDownload
                        className="text-default-500"
                        fontSize={"1.3rem"}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
          )
        }
      </div>
    </>
  );
};

export default Document;
