import { useGetCycleRecipient } from "../../../../../API/performance";
import PropTypes from "prop-types";
import StarLoader from "../../../loaders/StarLoader";
import {
  User,
  Building2,
  Briefcase,
  Award,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import { Avatar } from "@nextui-org/react";
import { preProfileLink } from "../../../../../utils/pre-profile-link";
// import { preProfileLink } from "../../../../../utils/pre-profile-link";

const ViewCycleRecipient = ({ cycle }) => {
  const { data: cycleRecipient, isPending: isLoadingRecipient } =
    useGetCycleRecipient({ cycle_id: cycle?.ID });

  const getStatusBadge = (isCompleted, isAnswered, isDraft) => {
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          <CheckCircle2 size={12} /> Completed
        </span>
      );
    }
    if (isAnswered) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          <FileText size={12} /> Answered
        </span>
      );
    }
    if (isDraft) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
          <FileText size={12} /> Draft
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
        <XCircle size={12} /> Pending
      </span>
    );
  };

  return (
    <>
      {isLoadingRecipient ? (
        <div className="h-[80vh] flex items-center justify-center">
          <StarLoader size={25} />
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Form Recipients
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Total: {cycleRecipient?.length || 0} recipients
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade/Step
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cycleRecipient && cycleRecipient.length > 0 ? (
                  cycleRecipient.map((recipient) => (
                    <tr
                      key={recipient.ID}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {/* <User size={20} className="text-blue-600" /> */}
                            <Avatar
                              src={preProfileLink(
                                recipient.FIRST_NAME,
                                recipient.LAST_NAME,
                              )}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {recipient.FIRST_NAME} {recipient.LAST_NAME}
                            </div>
                            {recipient.STAFF_NUMBER && (
                              <div className="text-xs text-gray-500">
                                {recipient.STAFF_NUMBER}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <Briefcase
                              size={16}
                              className="text-gray-400 mt-0.5 flex-shrink-0"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">
                              {recipient.DESIGNATION_NAME || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <Building2
                              size={16}
                              className="text-gray-400 mt-0.5 flex-shrink-0"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-gray-900">
                              {recipient.DEPARTMENT_NAME}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {recipient.DIRECTORATE_NAME}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <Award size={16} className="text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-900">
                            Grade {recipient.GRADE}
                            {recipient.STEP && ` / Step ${recipient.STEP}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(
                          recipient.IS_COMPLETED,
                          recipient.IS_ANSWERED,
                          recipient.IS_DRAFT,
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <User size={48} className="text-gray-300" />
                        <p className="text-gray-500 text-sm">
                          No recipients found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCycleRecipient;

ViewCycleRecipient.propTypes = {
  cycle: PropTypes.any,
};
