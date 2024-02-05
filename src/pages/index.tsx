import Link from "next/link";
const Home = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className="nav-bar flex justify-end  font-bold text-white ">
        <button className="mx-3 hover:text-yellow-300">Home</button>
        <Link href="/About_Us">
          <button className="mx-3 hover:text-yellow-300">About Us</button>
        </Link>
        <Link href="/Services">
          <button className="mx-3 hover:text-yellow-300"> Services</button>
        </Link>
        <Link href="/Contact_Us">
          <button className="mx-3 hover:text-yellow-300"> Contact</button>
        </Link>
        <Link href="/Login">
          <button className="mx-3 hover:text-yellow-300"> Login</button>
        </Link>
      </div>
      <div className=" mt-20">
        <div className="  text-left mx-72 my-2 text-4xl font-bold text-white">
          WELCOME TO
        </div>
        <div className=" flex justify-center  text-4xl my-2 font-bold ">
          <p className="bg-yellow-300 px-12 py-2">WEB-BASED DEATH FUND</p>
        </div>
        <div className=" text-right mx-60 text-4xl my-2 font-bold text-white">
          MANAGEMENT
        </div>
      </div>
      <div>
        <div>
          <p className=" text-yellow-300 py-5 text-center uppercase text-base font-semibold">
            In your darkest Times, we offer you our helping hand.
          </p>
        </div>
      </div>
      <div className=" flex justify-center ">
        <p className=" rounded-md   bg-slate-100  py-10  px-16 text-center">
          We have grown the intial 38 members to 413 members.
          <br />
          As a trusted organizatio, we proud that wehave already helped
          <br />
          numerousfamiliesin the community,
          <br />
          for we unite as on and helpin times of grief.
        </p>
      </div>
    </div>
  );
};

export default Home;
