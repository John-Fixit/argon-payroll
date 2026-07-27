/* eslint-disable react/prop-types */

import clsx from "clsx";


const Avatar = ({ image, isActive, bigger, big, fromChat }) => {
 
  return (
    <div className="relative">
      <div className={clsx("relative inline-block rounded-full overflow-hidden ", big ? 'w-8 h-8' : bigger  ? 'w-[2.7rem] h-[2.7rem]'  :'h-6 w-6 md:h-6 md:w-6', )}>
        <img
          src={image || '/assets/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <span  
          className={clsx("absolute block rounded-full   ring-white ",

          fromChat &&  bigger ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.22rem] bottom-[0.45rem]' :

          fromChat && big ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatactive right-[0.075rem] bottom-[0.4rem]' :
          
          fromChat ? ' bg-chatactive ring-1 h-[0.2rem] w-[0.2rem] md:h-[0.3rem] md:w-[0.3rem] right-[0.075rem] bottom-[0.4rem]' : 'bg-green-500 ring-2 h-[0.3rem] w-[0.3rem] md:h-[0.4rem] md:w-[0.4rem] right-0 bottom-2 '   )} 
        />
      ) : isActive === false ? (
        <span  
          className={clsx("absolute block rounded-full   ring-white ",
          
          fromChat && big ? ' ring-1 h-[0.4rem] w-[0.4rem] md:h-[0.5rem] md:w-[0.5rem] bg-chatinactive right-[0.075rem] bottom-[0.4rem]' :



          
          fromChat ? ' bg-chatinactive ring-1 h-[0.2rem] w-[0.2rem] md:h-[0.3rem] md:w-[0.3rem] right-[0.075rem] bottom-[0.4rem]' : 'bg-chatinactive ring-2 h-[0.3rem] w-[0.3rem] md:h-[0.4rem] md:w-[0.4rem] right-0 bottom-2 '   )} 
        />
      )
      
      
      :null}

 
    </div>
  );
}

export default Avatar;
