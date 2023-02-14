import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
import { useNavigate, Link } from "react-router-dom";
import Moment from "react-moment";
import Swal from "sweetalert2";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialActivityState = {
    title: "worht",
    email: "as@io.com",
  };
  const [todo, setTodo] = useState(initialActivityState);

  const saveActivity = () => {
    var data = {
      title: todo.title,
      email: todo.email,
    };
    setLoading(true);
    TutorialDataService.createActivityGroup(data)
      .then((response) => {
        setTodo({
          title: response.data.title,
          email: response.data.email,
        });
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e, "error");
      });
  };
  const date = new Date();

  let navigate = useNavigate();

  const deleteTutorial = (id) => {
    TutorialDataService.deleteActivitygroup(id)

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

  const retrieveTutorials = async () => {
    try {
      setLoading(true);
      TutorialDataService.getActivityGroup().then((response) => {
        setTutorials(response.data.data);
        console.log(response.data);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  return (
    <>
      <div className="container-md px-40 py-10">
        <div class="flex justify-between">
          <h1 data-cy="activity-title">Activity</h1>
          <button
            data-cy="activity-add-button"
            type="button"
            className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-white bg-[#16ABF8] "
            onClick={saveActivity}
          >
            {loading ? <>Loading..</> : <>+ Tambah</>}
          </button>
        </div>{" "}
        <div className="flex flex-row m-2">
          {loading ? (
            <>Loading</>
          ) : (
            <>
              <div className="flex flex-wrap -m-4">
                {tutorials &&
                  tutorials.map((tutorial, index) => (
                    <div className="p-4 lg:w-1/3" key={index}>
                      <div
                        className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                        data-cy="activity-item"
                      >
                        <Link to={`/detail/${tutorial.id}`}>
                          <h4
                            data-cy="activity-title"
                            className="font-bold m-4"
                          >
                            {tutorial.title}
                          </h4>
                        </Link>
                        <div className="flex justify-between m-4">
                          <Moment
                            data-cy="activity-item-date"
                            format="D MMMM YYYY"
                          >
                            {date}
                          </Moment>

                          <button
                            onClick={() => deleteTutorial(tutorial.id)}
                            data-cy="activity-item-delete-button"
                          >
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
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TutorialsList;
