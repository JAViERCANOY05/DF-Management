import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const Home = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 pt-10   ">
      <div className=" ">
        <div className="  text-left mx-72  text-4xl font-bold text-white">
          WEB-BASED
        </div>
        <div className=" flex justify-center  text-4xl my-2 font-bold ">
          <p className=" px-12 py-2 text-yellow-200">DEATH FUND MANAGEMENT</p>
        </div>
        <div className=" text-right mx-60 text-4xl my-2 font-bold text-white">
          SERVICES
        </div>
      </div>
      <div className=" mx-48">
        <div className="">
          <button className="bg-green-300  w-96 uppercase text-white font-bold p-4 rounded-md">
            Benificiary Management
          </button>
        </div>
        <div className="my-5">
          <ul className="  list-disc w-96 bg-green-300  uppercase text-white font-bold p-4 rounded-md">
            <li className=" ">
              Send reminders and notification to users and their chosen
              representative about important deadlines or action that need tobe
              takenin the state planning process
            </li>
          </ul>
          <div className=" my-10 ">
            <Link href="/Services">
              <Button variant="contained"> Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
