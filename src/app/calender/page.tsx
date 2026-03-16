"use client";

import { ProfileAnalyticsHeader } from "../../components/ProfileAnalyticsHeader";

const CalenderPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] px-2 sm:px-4 pt-4 sm:pt-6 pb-6 sm:pb-12">
      <main className="flex items-start justify-center">
        <div className="relative min-h-[735px] w-full max-w-7xl rounded-3xl sm:rounded-[42px] bg-white shadow-[0_18px_60px_rgba(23,37,76,0.08)] px-4 sm:px-10 pt-6 sm:pt-10">
          <ProfileAnalyticsHeader />
        </div>
      </main>
    </div>
  );
};

export default CalenderPage;