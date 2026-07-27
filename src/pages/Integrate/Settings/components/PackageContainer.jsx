/* eslint-disable react/prop-types */

import Package from './Package'


const PackageContainer = ({packages, filteredData, searchValue}) => {





  return (
    <div className='flex flex-col py-10'>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3   gap-10 '>
                {
                   (searchValue?.length > 0 ? filteredData :  packages)?.map(pk =>(
                        <Package 
                            key={pk.id}
                            name={pk.name}
                            desc={pk.description}
                            icon={pk.image}
                        />
                    ))
                }
        </div>
    </div>
  )
}

export default PackageContainer
