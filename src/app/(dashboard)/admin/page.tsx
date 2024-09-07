'use client'

import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import React, { FormEvent } from 'react';
import withAuth from "@/components/isAuth";

const AdminPage = () => {
  async function addPet(petName: string, ownerName: string): Promise<void> {
    try {
      const response = await fetch(`/api/add-pet?petName=${encodeURIComponent(petName)}&ownerName=${encodeURIComponent(ownerName)}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      } else {
        const data = await response.json();
        console.log('Pets:', data.pets);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  
  

const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  
  const petName = (event.currentTarget.petName as HTMLInputElement).value;
  const ownerName = (event.currentTarget.ownerName as HTMLInputElement).value;

  addPet(petName, ownerName);
};

// Example form
const PetForm: React.FC = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="petName" placeholder="Pet Name" required />
      <input type="text" name="ownerName" placeholder="Owner Name" required />
      <button type="submit">Add Pet</button>
    </form>
  );
};
  
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <PetForm />
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements/>
      </div>
    </div>
  );
};

export default withAuth(AdminPage);
