import PropTypes, { any } from "prop-types";

const PendingRequest = ({ pendingRequest }) => {
  return (
    <div>
      <div className="rounded-lg flex flex-col justify-between ">
        <div className="p-6 flex justify-start md:w-[60%]">
          <h2 className="text-2xl text-btnColor !font-thin font-helvetica">
            You have{" "}
            {pendingRequest?.length < 1 ? "no" : pendingRequest?.length} pending
            leave {pendingRequest?.length > 1 ? "requests" : "request"}
          </h2>
        </div>
        <div className="flex justify-center">
          <img
            src={
              "https://cdn.shopify.com/s/files/1/0093/6227/6415/files/02_Fashion-People-Vector-For-Free_1024x1024.png?v=1594027600"
            }
            className="w-[55%]"
            alt="Pending leave"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PendingRequest;

PendingRequest.propTypes = {
  pendingRequest: PropTypes.array || any,
};
