import React from "react";
import { CChart } from "@coreui/react-chartjs";

const Dashboard = () => {
  return (
    <div>
      <p className=" text-center  bg-slate-400 rounded-lg p-5">
        Cashier Dashboard
      </p>
      <div className="  flex justify-center my-20 gap-36">
        <div className=" flex ">
          <div className=" bg-slate-500 p-20 rounded-md">
            <p className=" text-white border-b-2">Total Contribution</p>
            <p className=" py-10 text-white ">100</p>
          </div>
        </div>
        <div className="h-96 w-96">
          <CChart
            type="doughnut"
            data={{
              labels: ["Paid", "Unpaid"],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                  data: [40, 20],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "#090D13",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
