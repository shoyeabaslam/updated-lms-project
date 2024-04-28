import { FC, useEffect, useState } from "react"
import { getMangerRelatedEmployee } from "../api/EmployeeAPI"
import { MdClose } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
interface Type {
    empId: number,
    setIsView:(prev:boolean)=>void
}

interface GridType{
    label:string,
    value:string
}

const GridItem:FC<GridType> = ({ label, value }) => {
    return (
    <div className="flex items-center mb-3 justify-start">
        <div className="mr-3">
          <span className="text-sm font-bold">{label}:</span>
        </div>
        <div className="rounded-md px-3 py-2  flex items-center justify-center">
          <span className="">{value}</span>
        </div>
      </div>
    );
  };

const ViewEmployeeDetails: FC<Type> = ({ empId ,setIsView}) => {
    const [formData,setFormData] = useState({
        EmpId:'',
        EmpName:'',
        EmpEmail:'',
        EmpPhone:''
    })
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getMangerRelatedEmployee(empId);
                if (res?.ok) {
                    const data = await res.json();
                    console.log(data)
                    setFormData({
                        EmpId:data.employee.empId,
                        EmpName:data.employee.employeeName,
                        EmpEmail:data.employee.employeeEmail,
                        EmpPhone:data.employee.employeePhone
                    })
                } else {
                    console.log("Invalid Employee Id");
                }
            } catch (err) {
                console.log(err)
            }
        }
        getData()
        return
    }, [empId])
    return (
        <div className="fixed flex justify-center items-center top-0 z-10  left-0 bottom-0 right-0 min-h-full  bg-white/80">
         <div className="grid grid-cols-1  border p-5 rounded-lg bg-orange-50 shadow-xl border-zinc-200 relative">
            <span className="absolute right-2 top-2 text-2xl text-rose-500 hover:text-rose-700 cursor-pointer" onClick={()=>setIsView(false)}><MdClose/></span>
            <div className="flex justify-center my-3"><BsPersonFill className="text-6xl"/></div>
            <GridItem label="Employee ID" value={formData.EmpId} />
            <GridItem label="Employee Name" value={formData.EmpName} />
            <GridItem label="Employee Email" value={formData.EmpEmail} />
            <GridItem label="Employee Phone" value={formData.EmpPhone} />
        </div>
        </div>
    )
}


export default ViewEmployeeDetails