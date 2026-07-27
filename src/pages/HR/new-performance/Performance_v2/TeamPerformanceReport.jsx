// TeamPerformanceReport.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Home,
  ChevronRight,
  User,
  Download,
  Eye,
  MoreVertical,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fake data – Individual Performance Reports                         */
/* ------------------------------------------------------------------ */
const makeReports = () => {
  const cycles = [
    "H1 2024",
    "H2 2024",
    "Q1 2024",
    "Q2 2024",
    "Q3 2024",
    "Q4 2024",
  ];
  const depts = [
    "Engineering",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
  ];
  const positions = [
    "Senior Developer",
    "Sales Manager",
    "Marketing Specialist",
    "HR Coordinator",
    "Financial Analyst",
    "Operations Lead",
  ];
  const statuses = ["Completed", "In-Progress", "Pending"];
  const rows = [];
  const names = [
    "John Smith",
    "Emma Davis",
    "Michael Chen",
    "Sarah Wilson",
    "David Brown",
    "Lisa Anderson",
    "James Taylor",
    "Maria Garcia",
    "Robert Johnson",
    "Jennifer Lee",
  ];

  for (let i = 1; i <= 42; i++) {
    rows.push({
      id: i,
      title: `Individual Report – ${names[i % names.length]}`,
      employeeName: names[i % names.length],
      position: positions[i % positions.length],
      cycle: cycles[i % cycles.length],
      department: depts[i % depts.length],
      generatedOn: `2024-${String(1 + (i % 11)).padStart(2, "0")}-${String(
        1 + (i % 27)
      ).padStart(2, "0")}`,
      generatedBy: ["Sarah J.", "Mike C.", "Emma W."][i % 3],
      status: statuses[i % 3],
      rating: (3.5 + (i % 15) / 10).toFixed(1),
      pdfUrl: "#",
    });
  }
  return rows;
};

const statusColor = {
  Completed: "success",
  "In-Progress": "warning",
  Pending: "default",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
const TeamPerformanceReport = () => {
  const [reports] = useState(makeReports());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "generatedOn",
    direction: "descending",
  });
  const rowsPerPage = 8;

  /* sorting --------------------------------------------------------- */
  const sorted = useMemo(() => {
    return [...reports].sort((a, b) => {
      const aa = a[sortDescriptor.column];
      const bb = b[sortDescriptor.column];
      let cmp = 0;
      if (aa > bb) cmp = 1;
      else if (aa < bb) cmp = -1;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
  }, [reports, sortDescriptor]);

  /* pagination ------------------------------------------------------ */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  return (
    <div className="min-h-screen p-6">
      {/* Breadcrumb -------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Breadcrumbs
          size="md"
          separator={<ChevronRight size={16} className="text-gray-400" />}
        >
          <BreadcrumbItem
            href="/performance/dashboard"
            startContent={<Home size={16} />}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/performance/reports">Reports</BreadcrumbItem>
          <BreadcrumbItem>Individual</BreadcrumbItem>
        </Breadcrumbs>
      </motion.div>

      {/* Header ------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Individual Performance Reports
            </h1>
            <p className="text-gray-600">
              Employee-specific performance reviews and assessments
            </p>
          </div>
        </div>
      </motion.div>

      {/* Responsive table ------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Table
          isHeaderSticky
          aria-label="Individual performance reports"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            wrapper: "shadow-lg rounded-xl max-h-[calc(100vh-280px)]",
          }}
          bottomContent={
            pages > 1 && (
              <div className="flex w-full justify-center py-4">
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={setPage}
                />
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn key="title" allowsSorting>
              Report Title
            </TableColumn>
            <TableColumn key="employeeName" allowsSorting>
              Employee Name
            </TableColumn>
            <TableColumn key="position" allowsSorting>
              Position
            </TableColumn>
            <TableColumn key="cycle" allowsSorting>
              Cycle
            </TableColumn>
            <TableColumn key="department" allowsSorting>
              Department
            </TableColumn>
            <TableColumn key="generatedOn" allowsSorting>
              Generated On
            </TableColumn>
            <TableColumn key="rating" allowsSorting className="text-center">
              Rating
            </TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn width={50}>Actions</TableColumn>
          </TableHeader>

          <TableBody items={items}>
            {(r) => (
              <TableRow
                key={r.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      {r.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{r.employeeName}</TableCell>
                <TableCell>{r.position}</TableCell>
                <TableCell>{r.cycle}</TableCell>
                <TableCell>{r.department}</TableCell>
                <TableCell>
                  {new Date(r.generatedOn).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-semibold text-gray-900">
                    {r.rating}/5.0
                  </span>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat" color={statusColor[r.status]}>
                    {r.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <MoreVertical size={18} className="text-gray-600" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Report actions">
                      <DropdownItem key="view" startContent={<Eye size={16} />}>
                        Preview
                      </DropdownItem>
                      <DropdownItem
                        key="download"
                        startContent={<Download size={16} />}
                      >
                        Download PDF
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default TeamPerformanceReport;
