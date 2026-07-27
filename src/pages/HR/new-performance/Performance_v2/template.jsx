/* ------------------------------------------------------------------ */
/*  1.  Imports                                                       */
/* ------------------------------------------------------------------ */
import { useState, useMemo } from "react";
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
import { FileText } from "lucide-react";
import CreateTemplateDrawer from "./CreateTemplateDrawer";
import ViewTemplate from "./ViewTemplate";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useGetListTemplate } from "../../../../API/performance";
import ActionIcons from "../../../../components/core/shared/ActionIcons";

/* ------------------------------------------------------------------ */
/*  3.  Component                                                     */
/* ------------------------------------------------------------------ */
const PerformanceTemplate = () => {
  // const [templates] = useState(makeTemplates());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const [templateAction, setTemplateAction] = useState({
    state: false,
    template: null,
    type: null,
  });
  const rowsPerPage = 20;

  const { userData } = useCurrentUser();

  const { data: getTemplates, isPending: isLoadingTemplates } =
    useGetListTemplate({
      company_id: userData?.data?.COMPANY_ID,
    });

  const templates = useMemo(
    () =>
      getTemplates?.map((tmpt) => ({
        ...tmpt,
        title: tmpt?.TITLE,
        id: tmpt?.ID,
      })) || [],
    [getTemplates],
  );

  /* ------------- sorting ----------------------------------------- */
  const sorted = useMemo(() => {
    const sorted = [...templates].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      let cmp = 0;
      if (first > second) cmp = 1;
      else if (first < second) cmp = -1;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [templates, sortDescriptor]);

  /* ------------- pagination -------------------------------------- */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  /* ------------- tiny helpers ------------------------------------ */
  // const statusColorMap = {
  //   Active: "success",
  //   Draft: "default",
  // };

  const handleAction = (type, template) => {
    setTemplateAction({ state: true, template: template, type: type });
  };

  const closeTemplateAction = () => {
    setTemplateAction({ state: false, template: null, type: null });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br pt-6 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Templates
              </h1>
              <p className="text-gray-600">
                Manage and create approval flow templates
              </p>
            </div>
            <div className="flex gap-3">
              {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <Calendar size={20} />
              Create Cycle
            </motion.button> */}
              <CreateTemplateDrawer />
            </div>
          </div>
        </motion.div>

        {/* -------------- NextUI responsive table ----------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Table
            aria-label="Performance templates"
            isHeaderSticky
            classNames={{
              wrapper: "max-h-[calc(100vh-280px)] shadow-lg rounded-xl",
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
                Template Title
              </TableColumn>

              <TableColumn key="createdBy">Created By</TableColumn>
              <TableColumn key="lastModified" allowsSorting>
                Created At
              </TableColumn>

              <TableColumn width={50}>Actions</TableColumn>
            </TableHeader>

            <TableBody
              items={items}
              loadingContent={<Spinner />}
              loadingState={isLoadingTemplates}
            >
              {(item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {item.title}
                      </span>
                    </div>
                  </TableCell>

                  {/* <TableCell>
                    <span className="text-sm text-gray-600 max-w-xs truncate">
                      {item.description}
                    </span>
                  </TableCell> */}

                  {/* <TableCell className="text-center">{item.sections}</TableCell> */}
                  {/* <TableCell className="text-center">
                    {item.questions}
                  </TableCell> */}

                  <TableCell>
                    {item.FIRST_NAME} {item?.LAST_NAME}
                  </TableCell>

                  <TableCell>
                    {new Date(item.DATE_CREATED).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>

                  {/* <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={statusColorMap[item.status]}
                    >
                      {item.status}
                    </Chip>
                  </TableCell> */}

                  {/* <TableCell className="text-center">
                    {item.usageCount}×
                  </TableCell> */}

                  <TableCell>
                    <div className="flex gap-2">
                      <ActionIcons
                        variant={"VIEW"}
                        action={() => handleAction("VIEW", item)}
                      />
                      <ActionIcons
                        variant={"EDIT"}
                        action={() => handleAction("EDIT", item)}
                      />

                      <ActionIcons
                        variant={"CREATE"}
                        action={() => handleAction("CREATE_CYCLE", item)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      <ViewTemplate
        isOpenViewTemplate={templateAction.state}
        closeViewTemplate={closeTemplateAction}
        template={templateAction.template}
        actionType={templateAction.type}
      />
    </>
  );
};

export default PerformanceTemplate;
