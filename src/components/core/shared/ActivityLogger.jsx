
import { useIdleTimer } from 'react-idle-timer';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { logoutAdminAction } from '../../../API/auth';
import { useLocation } from 'react-router-dom';


const SessionTimeout = () => {
  const { removeCurrentUser, userData } = useCurrentUser();
  const { pathname } = useLocation();


  const onIdle = () => {
    if(pathname==='/login'){
        return 
    }
    console.log('auto logout...')
    logout()
  };

  const logout = async () => {

    try {

    
      const res = await logoutAdminAction(userData?.data)
      if(res){
      removeCurrentUser();
      window.location.reload()
      }
    } catch (error) {
      console.log(error);
      removeCurrentUser();
      window.location.reload()
    }
  };

  useIdleTimer({
    onIdle,
    timeout: 60 * 60 * 1000, // 60 minutes
    throttle: 500
  });

  return null;
};

export default SessionTimeout;
