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
      <div className=" flex justify-center my-20">
        <div>
          <div className="">
            <button className="bg-green-300  uppercase text-white font-bold  py-10 px-72 rounded-md">
              Notification
            </button>
          </div>
          <div className="my-5">
            <ul className="  list-disc  bg-green-300  uppercase text-white font-bold py-20 px-20  rounded-md">
              <li className=" text-center ">
                Send reminders and notification to users <br /> and their chosen
                representative about <br /> important deadlines or action that
                need to <br /> be takenin the state planning process
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
    </div>
  );
};

export default Home;
