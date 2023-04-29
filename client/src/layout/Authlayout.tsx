
import { Outlet, useNavigate } from "react-router-dom"
import AuthUser from "../components/context/AuthUser"
import { useAppDispatch } from "../hooks/useRedux";
import { useEffect } from "react";
import { getSession } from "../redux/slice/authSlice";

export const Authlayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const getAccessToken = async () => {
      const session = await dispatch(getSession()).unwrap();

      if (!session.success) {
        return navigate('/')
      }
    }
    getAccessToken()
  }, [dispatch, navigate])



  return (
    <div>
      {/* {
        accessToken ? */}
      <AuthUser>
        <Outlet />
      </AuthUser>
      {/* :
          <Navigate to='/' />
      } */}
    </div>
  )
}

