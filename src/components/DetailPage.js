import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TutorialDataService from "../serviceapi/serviceApi";
import logo from "../image/empty.png";
import Select, { components } from "react-select";
import axios from "axios";
import ListActivityToDo from "./ListActivityToDo";

const data = [
  {
    value: 1,
    label: "Very High",
  },
  {
    value: 2,
    label: "High",
  },
  {
    value: 3,
    label: "Medium",
  },
  {
    value: 4,
    label: "Low",
  },
  {
    value: 5,
    label: "Very Low",
  },
];

export default function DetailPage() {
  let { id } = useParams();
  const [detail, setDetail] = useState();
  const [dataActivity, setDataActivity] = useState();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const initialActivityState = {
    title: "",
    activity_group_id: 1,
    email: "as@io.com",
  };

  const [todo, setTodo] = useState(initialActivityState);
  const [input, setInput] = useState("");

  const getTodo = (id) => {
    TutorialDataService.getDetailActivityGroup(id)
      .then((response) => {
        setDetail(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getActivity = () => {
    TutorialDataService.getAllTodo()
      .then((response) => {
        setDataActivity(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getList = async () => {
    try {
      let res = await axios.get(
        `https://todo.api.devcode.gethired.id/todo-items`
      );

      let options = [];

      if (res.data.data.length > 0) {
        res.data.data.forEach((data) => {
          options.push({
            label: data.priority,
            value: data.id,
          });

          setItems(options);
        });
      }
    } catch (e) {}
  };

  const saveToDo = (e) => {
    var data = {
      email: todo.email,
      title: input,
      activity_group_id: todo.activity_group_id,
    };
    TutorialDataService.createToDo(data)
      .then((response) => {
        setTodo({
          title: response.data.title,
          activity_group_id: response.data.activity_group_id,
          email: response.data.email,
        });
        setShowModal(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getList();
    getActivity();
  }, []);

  useEffect(() => {
    if (id) getTodo(id);
  }, [id]);

  //select
  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const [selected, setSelected] = useState("");

  var handleChange = (selected) => {
    setSelected(selected.value);
  };
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#212529",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <section>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-2/3 mx-auto">
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/2">
              <div className="flex flex-row">
                <div className="mr-2" data-cy="todo-back-button">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
                <div>
                  {" "}
                  <h1
                    id="TitleDetail"
                    data-cy="todo-title"
                    className="font-poppins mx-10"
                  >
                    {detail?.title}
                  </h1>
                </div>
                <div data-cy="todo-title-edit-button">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-2 w-1/2">
              <button
                data-cy="todo-add-button"
                className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-white bg-[#16ABF8] rounded-md "
                type="button"
                onClick={() => setShowModal(true)}
              >
                + Tambah
              </button>
              {showModal ? (
                <>
                  <div
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
                    data-cy="modal-add"
                  >
                    <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                      <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
                        <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                          <h3 className="text-xl font-medium text-black-900 dark:text-black">
                            Tambah List Item
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                        </div>

                        <div className="p-6 space-y-6">
                          <label
                            htmlFor="name"
                            className="text-gray-800 uppercase text-sm font-bold leading-tight tracking-normal"
                          >
                            nama list item
                          </label>
                          <input
                            id="title"
                            // value={activity.title}
                            class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                            placeholder="James"
                            name="title"
                            onChange={handleInputChange}
                          />

                          <Select
                            options={data}
                            onChange={handleChange}
                            // value={selectedValue}
                            // onInputChange={handleInputChangeSelect}
                            // onChange={handleChange}

                            // styles={{
                            //   option: (base) => ({
                            //     ...base,
                            //     border: `2px dotted ${items[2].color}`,
                            //     height: "100%",
                            //   }),
                            // }}
                            // styles={customStyles}
                          />
                        </div>

                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                          <button
                            onClick={saveToDo}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            I accept
                          </button>
                          <button
                            // onClick={() => close()}
                            onClick={() => setShowModal(false)}
                            type="button"
                            className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            // className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-end items-end overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                          <h3 className="text-3xl font=semibold">
                            General Info
                          </h3>
                          <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                              x
                            </span>
                          </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                          <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                            <label className="block text-black text-sm font-bold mb-1">
                              First Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                            <label className="block text-black text-sm font-bold mb-1">
                              Last Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                            <label className="block text-black text-sm font-bold mb-1">
                              Address
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                            <label className="block text-black text-sm font-bold mb-1">
                              City
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                          </form>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              ) : null}
            </div>
          </div>

          <div className="w-full  py-32 px-32 relative mt-4">
            {dataActivity ? (
              <>
                <ListActivityToDo />
              </>
            ) : (
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block  absolute inset-0"
                src={logo}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
