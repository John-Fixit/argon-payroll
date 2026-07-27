/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import ImageCamera from "./components/ImageCamera";





const ConnectAccount = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => {
        // window.location.reload();
        setRefreshKey((prevKey) => prevKey + 1);
      };


  return (
      <Fragment>

        {/* <ImageCamera key={refreshKey} refresh={refresh}/> */}
      </Fragment>
  )
}

export default ConnectAccount;
