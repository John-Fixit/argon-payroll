// PerformanceSettings.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

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
  Switch,
  Select,
  SelectItem,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import {
  Home,
  ChevronRight,
  Save,
  RotateCcw,
  MoreVertical,
  Settings,
  Bell,
  Eye,
  Clock,
  Zap
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  30 fake settings                                                  */
/* ------------------------------------------------------------------ */
const makeSettings = () => [
//   /* Global */
//   ...[...Array(6)].map((_, i) => ({
//     id: i + 1,
//     group: 'Global',
//     key: ['Default Currency', 'Date Format', 'Time Zone', 'Language', 'Number Format', 'Week Starts On'][i],
//     value: ['USD', 'MM/DD/YYYY', 'UTC-5', 'English', '1,234.56', 'Monday'][i],
//     type: i % 2 ? 'select' : 'text',
//     status: 'Active'
//   })),
  /* Review-cycle */
  ...[...Array(6)].map((_, i) => ({
    id: 7 + i,
    group: 'Review-cycle',
    key: ['Auto-start next cycle', 'Allow mid-cycle edits', 'Force 360 feedback', 'Require sign-off', 'Anonymous feedback', 'Calibration stage'][i],
    value: i % 3 === 0,
    type: 'toggle',
    status: i % 5 === 0 ? 'Beta' : 'Active'
  })),
  /* Notifications */
  ...[...Array(6)].map((_, i) => ({
    id: 13 + i,
    group: 'Notifications',
    key: ['Email reminders', 'Slack integration', 'In-app alerts', 'Mobile push', 'Digest weekly', 'Due-date nudge'][i],
    value: i % 2 === 0,
    type: 'toggle',
    status: 'Active'
  })),
  /* Visibility */
  ...[...Array(6)].map((_, i) => ({
    id: 19 + i,
    group: 'Visibility',
    key: ['Managers see team avg', 'Employees see self score', 'HR sees all', 'Exec dashboard', 'Export to HRIS', 'Share with finance'][i],
    value: i % 3 !== 0,
    type: 'toggle',
    status: i % 4 === 0 ? 'Beta' : 'Active'
  })),
  /* Automation */
  ...[...Array(6)].map((_, i) => ({
    id: 25 + i,
    group: 'Automation',
    key: ['Auto-escalate overdue', 'Auto-lock after deadline', 'Generate PDF report', 'Send to payroll', 'Create calibration file', 'Archive after 1 yr'][i],
    value: i % 3 === 0,
    type: 'toggle',
    status: 'Active'
  }))
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */













const PerformanceSetting = () => {
  const [settings, setSettings] = useState(makeSettings());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'group', direction: 'ascending' });
  const rowsPerPage = 10;

  /* ------------- track dirty changes ------------------------------- */
  const [dirty, setDirty] = useState(new Set());

  /* ------------- sorting ------------------------------------------ */
  const sorted = useMemo(() => {
    const s = [...settings].sort((a, b) => {
      const aa = a[sortDescriptor.column];
      const bb = b[sortDescriptor.column];
      let cmp = 0;
      if (aa > bb) cmp = 1; else if (aa < bb) cmp = -1;
      return sortDescriptor.direction === 'ascending' ? cmp : -cmp;
    });
    return s;
  }, [settings, sortDescriptor]);

  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);





















  /* ------------- inline edit helpers ------------------------------- */
  const toggleValue = (id) => {
    setSettings((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, value: !row.value } : row
      )
    );
    setDirty((d) => new Set(d).add(id));
  };
  const selectValue = (id, newVal) => {
    setSettings((prev) =>
      prev.map((row) => (row.id === id ? { ...row, value: newVal } : row))
    );
    setDirty((d) => new Set(d).add(id));
  };

  /* ------------- bulk actions ------------------------------------- */
  const saveAll = () => {
    /* fake api call */
    alert(`Saved ${dirty.size} changes`);
    setDirty(new Set());
  };
  const resetAll = () => {
    setSettings(makeSettings());
    setDirty(new Set());
  };

  return (
    <div className="min-h-screen  p-6">
      {/* Breadcrumb -------------------------------------------------- */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Breadcrumbs separator={<ChevronRight size={16} className="text-gray-400" />}>
          <BreadcrumbItem href="/performance/dashboard" startContent={<Home size={16} />}>Home</BreadcrumbItem>
          <BreadcrumbItem href="/performance/setting">Settings</BreadcrumbItem>
 
        </Breadcrumbs>
      </motion.div>

      {/* Header ------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance Settings</h1>
          <p className="text-gray-600">Manage global preferences, cycles, notifications and automation rules</p>
        </div>
        <div className="flex gap-3">
          <Button
            color="primary"
            startContent={<Save size={18} />}
            isDisabled={dirty.size === 0}
            onPress={saveAll}
          >
            Save changes ({dirty.size})
          </Button>
          <Button
            variant="bordered"
            startContent={<RotateCcw size={18} />}
            isDisabled={dirty.size === 0}
            onPress={resetAll}
          >
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Layout : table + sticky summary card ----------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table ---------------------------------------------------- */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Table
              isHeaderSticky
              aria-label="Performance settings"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
              classNames={{ wrapper: 'shadow-lg rounded-xl max-h-[calc(100vh-280px)]' }}
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
                <TableColumn key="group" allowsSorting>Group</TableColumn>
                <TableColumn>Setting</TableColumn>
                <TableColumn width={180}>Value</TableColumn>
                <TableColumn width={120}>Status</TableColumn>
                <TableColumn width={50}>Actions</TableColumn>
              </TableHeader>

              <TableBody items={items}>
                {(row) => (
                  <TableRow key={row.id} className="hover:bg-blue-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {row.group === 'Global' && <Settings size={16} className="text-gray-500" />}
                        {row.group === 'Review-cycle' && <Clock size={16} className="text-gray-500" />}
                        {row.group === 'Notifications' && <Bell size={16} className="text-gray-500" />}
                        {row.group === 'Visibility' && <Eye size={16} className="text-gray-500" />}
                        {row.group === 'Automation' && <Zap size={16} className="text-gray-500" />}
                        <span className="font-medium text-gray-900">{row.group}</span>
                      </div>
                    </TableCell>

                    <TableCell>{row.key}</TableCell>

                    <TableCell>
                        {row.type === 'toggle' && (
                            <Switch
                            size="sm"
                            isSelected={row.value}
                            onValueChange={() => toggleValue(row.id)}
                            />
                        )}
                        {row.type === 'select' && (
                        <Select
                            size="sm"
                            aria-label="Setting value"
                            selectedKeys={[String(row.value)]} // safe to display
                            className="max-w-xs"
                            onSelectionChange={(keys) =>
                            selectValue(row.id, Array.from(keys)[0])
                            }
                        >
                            {/* SINGLE item – key is always a string */}
                            <SelectItem key={`sel-${row.id}`}>{String(row.value)}</SelectItem>
                        </Select>
                        )}

                        </TableCell>

                    <TableCell>
                      <Chip size="sm" variant="flat" color={row.status === 'Beta' ? 'warning' : 'success'}>
                        {row.status}
                      </Chip>
                    </TableCell>

                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical size={18} className="text-gray-600" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Setting actions">
                          <DropdownItem key="help">Help</DropdownItem>
                          <DropdownItem key="reset" className="text-warning">Reset to default</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </div>

        {/* Sticky summary card -------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky top-6 h-fit"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick glance</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active settings</span>
                <Chip size="sm" color="success" variant="flat">{settings.filter((s) => s.status === 'Active').length}</Chip>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beta features</span>
                <Chip size="sm" color="warning" variant="flat">{settings.filter((s) => s.status === 'Beta').length}</Chip>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending save</span>
                <Chip size="sm" color="primary" variant="flat">{dirty.size}</Chip>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button size="sm" fullWidth color="primary" startContent={<Save size={16} />} isDisabled={dirty.size === 0} onPress={saveAll}>
                Save
              </Button>
              <Button size="sm" fullWidth variant="bordered" startContent={<RotateCcw size={16} />} isDisabled={dirty.size === 0} onPress={resetAll}>
                Reset
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceSetting;