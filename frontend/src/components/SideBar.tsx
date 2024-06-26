import { FC, useState, useEffect, useContext } from "react";
import ReactChildType from "../types/ReactChildType";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose ,MdAccountCircle} from "react-icons/md";
import ISideBarData from "../types/ISideBarData";
import { FiLogOut } from "react-icons/fi";
import img from '../assets/images/logo.png'
import { useLocation, useNavigate} from "react-router";
import UserContext from "../context/UserContext";

interface SideBarData extends ReactChildType{
  data:ISideBarData[]
}

const SideBar: FC<SideBarData> = ({ children ,data}) => {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    userId:'',
    userName:''
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentUrlLocation,setCurrentUrlLocation] = useState('');
  const location = useLocation();
  const navigation = useNavigate();
  
  useEffect(()=>{
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 1024); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[])

  useEffect(() => {
    setCurrentUrlLocation(location.pathname);
    if(user){
      setUserData({
        userId:`Employee Id: ${user.empId}`,
        userName:user.employeeName
      })
    }
  }, [location.pathname, data, user]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigation = (url:string)=>{
    navigation(url)
  }
  function handleLogout(): void {
    localStorage.removeItem('ResponseData')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="">
      <div
        className={`fixed z-30 top-0 left-0 bottom-0 w-[200px] bg-slate-800 backdrop-blur-sm ${
          window.innerWidth < 1024 && `transition-transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-[200px]"
          }`
          }`}
      >
        <div className="flex justify-end my-2">
          <h2
            className="text-end mr-3 text-2xl text-gray-200 cursor-pointer"
            onClick={closeDrawer}
          >
            {
              (window.innerWidth < 1024) && <MdOutlineClose />
            }
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-2 p2 text-white">
          <MdAccountCircle className="text-7xl" />
          <div className="text-sm">{userData.userId}</div>
          <div className="text-sm">{userData.userName}</div>
        </div>
        <ul className="flex flex-col space-y-6 lg:text-lg px-4 my-9 text-gray-200/50">
          {
            data.map((item,index)=>(
              <li onClick={()=>handleNavigation(item.url)} key={index} className={`flex items-center space-x-2 hover:underline hover:text-gray-200 text-sm cursor-pointer w-fit ${currentUrlLocation === item.url && 'text-gray-200 underline'} `}>
                <div>{<item.icon/>}</div>
                <div>{item.name}</div>
              </li>
            ))
          }
           <li className="flex items-center space-x-2 hover:underline hover:text-gray-200 text-sm cursor-pointer w-fit ">
                <div><FiLogOut/></div>
                <div onClick={handleLogout}>Logout</div>
              </li>
        </ul>
      </div>
      <div style={{backgroundImage:'linear-gradient(45deg, #f0f0f0, rgb(237, 242, 255))'}}
       className=" fixed top-0 left-0 w-full  shadow-md py-2 flex space-x-2 items-center">
        <h4
          
          className="px-2 md:px-3 h-10 lg:px-5 flex items-center cursor-pointer text-2xl"
          onClick={toggleDrawer}
        >
          {!isDrawerOpen && <GiHamburgerMenu />}
        </h4>
        <img className="h-6 lg:pl-[160px]" src={img}/>
        <div className="w-full flex items-center justify-center">
          <h3 className=" sm:text-xl font-bold md:mr-36  text-slate-950">Leave Management</h3>
        </div>
      </div>
      <div className="lg:ml-[200px] px-2 md:px-3 lg:px-5 py-10">{children}</div>
    </div>
  );
};

export default SideBar;
