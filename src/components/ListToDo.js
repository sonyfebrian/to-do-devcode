import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Swal from "sweetalert2";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const date = new Date();

  let navigate = useNavigate();

  const deleteTutorial = (id) => {
    TutorialDataService.deleteActivitygroup(id);
    Swal.fire({
      icon: "warning",
      html: "Apakah anda yakin menghapus activity <br/> <b>metting dengan client</b>, ",
    })

      .then((response) => {
        console.log(response.data, "tes delete");
        refreshList();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(tutorials, "cek");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getActivityGroup()
      .then((response) => {
        setTutorials(response.data.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  return (
    <>
      <div class="flex flex-wrap justify-center align-center">
        {tutorials &&
          tutorials.map((tutorial, index) => (
            <div className="p-4 md:w-1/4" key={index}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="w-full">
                  <div className="w-full flex p-2 mb-10">
                    <div className="pl-2 pt-2 ">
                      <p className="font-bold">{tutorial.title}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center flex-wrap ">
                    <a href="/" className="text-green-800  md:mb-2 lg:mb-0">
                      <p className="inline-flex items-center">
                        <Moment format="D MMMM YYYY">{date}</Moment>
                      </p>
                    </a>
                    <span className="text-gray-400 mr-3  items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 "></span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <button onClick={() => deleteTutorial(tutorial.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TutorialsList;
