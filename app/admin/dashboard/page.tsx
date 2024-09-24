"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaUsers } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { LuCircleDollarSign } from "react-icons/lu";
import { PiFlowArrowFill } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";
import { ENDPOINTS } from "@/app/utils/apis/endpoints";
import { getRequest } from "@/app/utils/apis/apiRequests";
import StatsCard from "@/app/components/pages/admin/dashboard/StatsCard";

const BarChart = dynamic(() => import("@/app/components/charts/BarChart"), {
  ssr: false,
});

const DonutChart = dynamic(() => import("@/app/components/charts/DonutChart"), {
  ssr: false,
});

interface dashboardProps {
  total_users: string;
  total_courses: string;
  earnings: string;
  top_category: string;
  top_course: string;
  active_users: string;
  new_users: string;
  revenue: string;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<dashboardProps | null>(
    null
  );

  const getDashboardData = useCallback(async () => {
    const url = ENDPOINTS.GET_DASHBOARD_DATA;
    const response = await getRequest(url);
    if (response?.data) {
      setDashboardData(response?.data);
    } else {
      console.error("No data found in the response");
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr,350px] w-full">
      <div>
        {dashboardData && (
          <div className="flex flex-wrap gap-5">
            <StatsCard
              label="Total Users"
              count={dashboardData.total_users}
              icon={<FaUsers />}
              iconClass="text-primary bg-primaryDim"
            />
            <StatsCard
              label="Total Courses"
              count={dashboardData.total_courses}
              icon={<CiViewList />}
              iconClass="text-bluePrimary bg-blueDim"
            />
            <StatsCard
              label="Earning"
              count={dashboardData.earnings}
              icon={<LuCircleDollarSign />}
              iconClass="text-greenPrimary bg-greenDim"
            />
            <StatsCard
              label="Top Category"
              count={dashboardData.top_category}
              icon={<PiFlowArrowFill />}
              iconClass="text-yellowPrimary bg-yellowDim"
            />
            <StatsCard
              label="Top Course"
              count={dashboardData.top_course}
              icon={<SlBookOpen />}
              iconClass="text-orangePrimary bg-orangeDim"
            />
          </div>
        )}

        <div className="rounded-xl bg-white p-6 mt-6 shadow-custom-light">
          <div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-blackPrimary">
                Revenue
              </h2>
              <h4 className="text-xs font-normal text-greyPrimary">
                Monthly Earning
              </h4>
            </div>
          </div>
          <BarChart />
        </div>
      </div>

      <div className="space-y-6">
        {dashboardData && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-custom-light">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-blackPrimary">
                  Active Users
                </h2>
                <h4 className="text-xs font-normal text-greyPrimary">
                  Active Users Watching Course Videos
                </h4>
              </div>
              <DonutChart
                heading="Active Users"
                users={dashboardData.active_users}
                total_users={dashboardData.total_users}
                colors={["#00AC4F", "#E5F7ED"]}
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-custom-light">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-blackPrimary">
                  New Users
                </h2>
                <h4 className="text-xs font-normal text-greyPrimary">
                  New Users that Buy Courses
                </h4>
              </div>
              <DonutChart
                heading="New Users"
                users={dashboardData.new_users}
                total_users={dashboardData.total_users}
                colors={["#00AC4F", "#E5F7ED"]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
