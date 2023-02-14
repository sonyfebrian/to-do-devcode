import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
import axios from "axios";
import Select from "react-select";

const Modal = ({ show, close }) => {
  const [items, setItems] = useState([]);
  const initialActivityState = {
    title: "coba 2",

    email: "tes@io.com",
  };
  const [activity, setActivity] = useState(initialActivityState);
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(value);
    setActivity({ ...activity, [name]: value });
  };

  const saveActivity = () => {
    var data = {
      title: "coba2",
      email: "tes@io.com",
    };
    TutorialDataService.create(data)
      .then((response) => {
        setActivity({
          title: response.data.title,
          email: response.data.email,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  const newTutorial = () => {
    setActivity(initialActivityState);
    setSubmitted(false);
  };
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

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  // handle input change event
  const handleInputChangeSelect = (value) => {
    setValue(value);
  };
  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("id");
    setActivity(activity.filter((item) => item.id !== name));
  };
  useEffect(() => {
    getList();
  }, []);
  // handle selection
  const handleChange = (value) => {
    console.log(value, "get");
    setSelectedValue(value);
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

  return (
    <>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button
            className="btn btn-success"
            onClick={newTutorial}
            data-cy="todo-add-button"
          >
            Add
          </button>
        </div>
      ) : (
        <>
          {show ? (
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
              <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
                  <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-medium text-black-900 dark:text-black">
                      Tambah List Item
                    </h3>
                    <button
                      type="button"
                      onClick={() => close()}
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
                      value={activity.title}
                      class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="James"
                      name="title"
                      onChange={handleInputChange}
                    />

                    <Select
                      options={items}
                      value={selectedValue}
                      onInputChange={handleInputChangeSelect}
                      onChange={handleChange}
                      defaultValue={items[0]}
                      styles={{
                        option: (base) => ({
                          ...base,
                          border: `1px dotted ${items[2].color}`,
                          height: "100%",
                        }),
                      }}
                    />
                  </div>

                  <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={saveActivity}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                    <button
                      onClick={() => close()}
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
          ) : null}
        </>
      )}
    </>
  );
};

export default Modal;
