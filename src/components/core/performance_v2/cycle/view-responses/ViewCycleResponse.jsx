import {
  useGetCycleResponse,
  useGetStaffResponse,
} from "../../../../../API/performance";
import PropTypes from "prop-types";
import StarLoader from "../../../loaders/StarLoader";
import { User } from "lucide-react";
import ActionIcons from "../../../shared/ActionIcons";

const ViewCycleResponse = ({ cycle }) => {
  const { data: cycleResponse, isPending: isLoadingResponse } =
    useGetCycleResponse({ cycle_id: cycle?.ID });

  const { mutateAsync: getStaffResponse } = useGetStaffResponse();

  const handleViewAnswerResponse = async (response) => {
    const json = {
      staff_id: response?.STAFF_ID,
      cycle_id: cycle?.ID,
    };
    try {
      const res = await getStaffResponse(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoadingResponse ? (
        <div className="h-[80vh] flex items-center justify-center">
          <StarLoader size={25} />
        </div>
      ) : (
        <>
          <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Form Responses
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Total: {cycleResponse?.length || 0} recipients
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cycleResponse && cycleResponse.length > 0 ? (
                    cycleResponse.map((recipient) => (
                      <tr
                        key={recipient.ID}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {recipient.FIRST_NAME} {recipient.LAST_NAME}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            {recipient.STAFF_NUMBER}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex">
                            <ActionIcons
                              variant={"VIEW"}
                              action={() => handleViewAnswerResponse(recipient)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <User size={48} className="text-gray-300" />
                          <p className="text-gray-500 text-sm">
                            No Response from Staff
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewCycleResponse;

ViewCycleResponse.propTypes = {
  cycle: PropTypes.any,
};
