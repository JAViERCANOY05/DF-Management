import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import GetReport from "../api/getReport";

const Dashboard = () => {
  const [data, setData] = useState({
    totalamount: "",
    totalNumberMember: "",
    transaction: {
      paid: "",
      waitingForapproval: "",
    },
  });
  const [paid, setPaid] = useState(0);
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetReport.report(token);
      if (response.status) {
        console.log(response.response, "report ! ");
        setData(response.response);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const p = parseInt(data.transaction.paid);
  const app = parseInt(data.transaction.waitingForapproval);

  return (
    <div>
      <p className=" text-center  bg-slate-400 rounded-lg p-5">
        Admin Dashboard
      </p>
      <div className="  flex justify-center my-20 gap-36">
        <div className=" flex ">
          <div className=" bg-slate-500 p-20 rounded-md">
            <p className=" text-white border-b-2 text-center">Reports </p>
            <p className=" py-10 text-white ">
              Total Amount : ₱ {data.totalamount}
            </p>
            <p className="  text-white ">Members : {data.totalNumberMember}</p>
          </div>
        </div>
        <div className="h-96 w-96">
          <CChart
            type="doughnut"
            data={{
              labels: ["Paid", "Waiting for Approval"],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                  data: [p, app],
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
