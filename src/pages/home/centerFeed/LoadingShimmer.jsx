/* eslint-disable react/prop-types */
import {Card, Skeleton} from "@nextui-org/react";

 const  LoadingShimmer = ({isLoaded})=>{

  return (
    <div className="flex flex-col gap-3 mb-5">
      <Card className="w-full space-y-5 p-8 h-[500px]" radius="lg">
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12"/>
        </div>  
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg"/>
          <Skeleton className="h-3 w-4/5 rounded-lg"/>
        </div>
      </div>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <div className="h-[30rem] rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
          </Skeleton>
        </div>
        <div className="flex gap-x-2  mt-4 items-center">
          <div className=" flex ">
            <Skeleton className="flex rounded-full w-12 h-12 "/>
            <Skeleton className="flex rounded-full w-12 h-12 -mx-4"/>
            <Skeleton className="flex rounded-full w-12 h-12"/>
          </div> 
          <div>
            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
              <div className="h-5 w-[400px] rounded-lg bg-secondary-200"></div>
            </Skeleton>
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton isLoaded={isLoaded} className="w-full rounded-lg">
            <div className="h-7 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-full rounded-lg">
            <div className="h-7 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
export default LoadingShimmer