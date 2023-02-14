import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
import { useNavigate, Link } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import Swal from "sweetalert2";

const TutorialsList = () => {
  const [dataActivity, setDataActivity] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Get Data
  useEffect(() => {
    axios
      .get(
        `https://todo.api.devcode.gethired.id/activity-groups?email=as@io.com`
      )
      .then((res) => {
        console.log(res.data, "cek data");
        setDataActivity(res.data.data);
      })

      .catch((e) => {
        console.log(e, "error");
      });
  }, []);
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

        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
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
                {dataActivity &&
                  dataActivity.map((tutorial, index) => (
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
                            onClick={() => setShowModal(true)}
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
        {showModal ? (
          <>
            <div
              className="relative p-4 w-full max-w-md h-full md:h-auto"
              data-cy="modal-delete"
            >
              <div
                className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
                data-cy="todo-modal-delete"
              >
                <button
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p
                  className="mb-4 text-gray-500 dark:text-gray-300"
                  data-cy="modal-delete-title"
                >
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    type="button"
                    data-cy="modal-delete-cancel-button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    data-cy="modal-delete-confirm-button"
                    type="submit"
                    onClick={() => setShowModal(false)}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default TutorialsList;
