import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Moment from "react-moment";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const date = new Date();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(tutorials, "cek");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
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
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.remove()
      .then((response) => {
        console.log(response.data.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="col-md-8"></div>
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-wrap -m-4">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <div className="p-4 md:w-1/4">
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
                        <button>
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
      </div>
      <button className="m-3 btn btn-sm btn-danger" onClick={deleteTutorial}>
        Delete
      </button>
    </>
  );
};

export default TutorialsList;
