import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import { withAuth } from "@/components/isAuth";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  const year = new Date().getFullYear();
  return (
    <div className="p-4 h-80 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard name="Students" year={year} section={""}/>
          <UserCard name="Teachers" year={year} section={""}/>
        
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          {/* <div className="w-full lg:w-full h-[450px]">
            <CountChart />
          </div> */}
           {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <CountChart />
        </div>
         
        </div>
       
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements/>
      </div>
    </div>
    
  );
};

export default withAuth(AdminPage, {roles: ["admin"]});