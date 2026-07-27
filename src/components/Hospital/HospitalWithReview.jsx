
import { useGetHospitalReview } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import moment from "moment";
import PropTypes from "prop-types";

// Component to fetch and display reviews for a single hospital
const HospitalWithReviews = ({ hospital }) => {
  const { userData } = useCurrentUser();

  const company_id = userData?.data.COMPANY_ID;
  const {
    data: getReview,
    isLoading,
    isError,
  } = useGetHospitalReview({
    hospital_id: hospital?.HOSPITAL_ID, // Pass the hospital_id
    company_id: company_id, // Assuming you have company_id from the profile
  });

  const comments = getReview?.comments;

  return (
    <>
      <li className="mb-10 ms-8">
        <span className="absolute w-[10px] h-[10px] border-2 border-btnColor bg-white rounded-full -start-[5.8px]"></span>
        <h3 className="font-medium leading-tight font-helvetica">
          {hospital?.HOSPITAL_NAME}
        </h3>
        {isLoading ? (
          <p className="text-gray-400 text-xs font-normal mt-2 font-helvetica">
            Loading reviews...
          </p>
        ) : isError ? (
          <p className="text-gray-400 text-xs font-normal mt-2 font-helvetica">
            Error Loading reviews...
          </p>
        ) : (
          comments?.map((comment, index) => (
            <div
              className="flex gap-1 items-center text-gray-400 text-xs  mt-3"
              key={index + "comment" + index}
            >
              <p className="mt-2 font-helvetica">
                visited on{" "}
                {moment(comment?.VISIT_DATE).format("dddd MMM Do YYYY")}
              </p>
            </div>
          ))
        )}
      </li>
    </>
  );
};

export default HospitalWithReviews;

HospitalWithReviews.propTypes = {
  hospital: PropTypes.object
}