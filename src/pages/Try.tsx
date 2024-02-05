// YourComponent.js

import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const YourComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-12">
        <div
          className="relative block w-1/4 h-64 
                      bg-gray-900 group"
        >
          <div
            className="absolute text-center pt-20 bg-blue-700 inset-0 
                            w-full h-64 group-hover:opacity-50"
          >
            <LocationOnIcon className=" text-white" />
          </div>
          <div className="relative p-10">
            <div className="mt-2">
              {/* Hidden content */}
              <div
                className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
              >
                <div className="p-2">
                  <p className="text-xl text-center text-white">
                    Purok 4 Lungsudaan,Candija, Bohol
                  </p>
                </div>
              </div>
              {/* End of hidden content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourComponent;
