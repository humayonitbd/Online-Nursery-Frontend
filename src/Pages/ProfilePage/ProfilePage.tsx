import userApi from "@/redux/features/users/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { FaUserCircle } from "react-icons/fa";



const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data } = userApi.useGetUserQuery(user?.email);
  const userData = data?.data;
  // console.log('profile page user data', userData)
    return (
      <div className="w-11/12 mx-auto pb-10 pt-5 md:pb-20 bg-white">
        <div className="flex justify-between items-start bg-gray-800 md:px-5 p-3 rounded">
          <div className="text-center">
            <span>
              {userData ? (
                <>
                  <img
                    className="h-52 w-52 rounded-full "
                    src={userData?.profileImg}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <FaUserCircle className="h-52 w-52 rounded-full text-slate-200" />
                </>
              )}
            </span>
            <h2 className="text-xl font-semibold text-slate-200">
              {userData ? userData.name : "userName"}
            </h2>
            <p className=" text-slate-200">
              {userData ? userData.email : "usermail@gmail.com"}
            </p>
          </div>
          <div className=" ">
            <p className="text-slate-200 text-xl font-semibold">
              Wellcome to visite your Profile.
            </p>
            <button className="btn mt-3 float-end py-1">Edit Profile</button>
          </div>
        </div>
        <div className=" py-20 md:py-48">
          <h2 className="text-center text-2xl font-semibold">
            Comming Other Info Add And Update...
          </h2>
        </div>
      </div>
    );
};

export default ProfilePage;