// Combined Solution: Search + Filter + Pagination
import { Collapse, Input, Pagination } from "antd";
import { useState, useMemo } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
const { Panel } = Collapse;

const ITEMS_PER_PAGE = 20;

function SearchablePaginatedCollapse({ ranks, control, watch, onChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);

  // Memoized filtered data to avoid recalculation on every render
  const filteredRanks = useMemo(() => {
    if (!ranks) return [];

    let filtered = ranks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((rank) =>
        rank?.RANK?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply selected ranks filter
    if (selectedRanks.length > 0) {
      filtered = filtered.filter((rank) => selectedRanks.includes(rank.RANK));
    }

    return filtered;
  }, [ranks, searchTerm, selectedRanks]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredRanks.slice(startIndex, endIndex);
  }, [filteredRanks, currentPage, pageSize]);

  // Reset to first page when filters change
  //   const handleSearchChange = (e) => {
  //     setSearchTerm(e.target.value);
  //     setCurrentPage(1);
  //   };

  //   const handleSelectedRanksChange = (values) => {
  //     setSelectedRanks(values);
  //     setCurrentPage(1);
  //   };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  //   const clearAllFilters = () => {
  //     setSearchTerm("");
  //     setSelectedRanks([]);
  //     setCurrentPage(1);
  //   };

  return (
    <div>
      {/* Search and Filter Controls */}
      {
        //   <div className="mb-4 space-y-3">
        //     <Select
        //       mode="multiple"
        //       placeholder="Select specific ranks to show (optional)"
        //       value={selectedRanks}
        //       onChange={handleSelectedRanksChange}
        //       style={{ width: "100%" }}
        //       options={ranks?.map((rank) => ({
        //         label: rank.RANK,
        //         value: rank.RANK,
        //       }))}
        //       maxTagCount="responsive"
        //       allowClear
        //     />
        //     {/* Results Summary */}
        //     <div className="text-sm text-gray-600">
        //       Showing {paginatedData.length} of {filteredRanks.length} ranks
        //       {filteredRanks.length !== ranks?.length && (
        //         <span> (filtered from {ranks?.length} total)</span>
        //       )}
        //     </div>
        //   </div>
      }

      {/* Collapse with filtered and paginated data */}
      <Collapse accordion>
        {paginatedData?.map((rank) => {
          // Find original index in the full ranks array
          const originalIndex = ranks.findIndex((r) => r.RANK === rank.RANK);
          return (
            <Panel header={rank?.RANK} key={originalIndex + rank?.CODE}>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <h5 className="uppercase text-[0.825rem] tracking-[1px]">
                    Amount to pay
                  </h5>
                  <Controller
                    name={`amount_to_pay`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        aria-label="amount_to_pay"
                        size="large"
                        placeholder="Enter your Amount"
                        {...field}
                        value={
                          watch("allowances_values")?.[originalIndex]
                            ?.amount_to_pay
                        }
                        onChange={(e) =>
                          onChange({
                            value: e.target.value,
                            rankIndex: originalIndex,
                            rank,
                          })
                        }
                        autoFocus
                      />
                    )}
                    rules={{ required: "This field is required" }}
                  />
                </div>
              </div>
            </Panel>
          );
        })}
      </Collapse>

      {/* No results message */}
      {filteredRanks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No ranks found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {filteredRanks.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredRanks.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
          />
        </div>
      )}
    </div>
  );
}

export default SearchablePaginatedCollapse;

SearchablePaginatedCollapse.propTypes = {
  ranks: PropTypes.array,
  control: PropTypes.any,
  watch: PropTypes.func,
  onChange: PropTypes.func,
};
