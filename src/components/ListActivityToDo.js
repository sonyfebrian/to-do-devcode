import React, { useState, useEffect } from "react";
import TutorialDataService from "../serviceapi/serviceApi";
export default function ListActivityToDo() {
  const [dataToDo, setDataToDo] = useState();

  const getAllTodoList = () => {
    TutorialDataService.getAllTodo()
      .then((response) => {
        setDataToDo(response.data.data);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = (id) => {
    TutorialDataService.deleteActivity(id)
      .then((response) => {
        console.log(response.data, "delete sukses");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTodoList();
  }, []);
  return (
    <>
      {dataToDo &&
        dataToDo.map((item, i) => (
          <div
            className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto  max-w-md md:max-w-2xl mt-2 "
            data-cy="todo-item"
          >
            <div className="flex items-start px-4 py-6">
              <div className="flex items-center mr-4">
                <input
                  data-cy="todo-item-checkbox"
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <h2
                className="text-lg font-semibold text-gray-900 -mt-1"
                data-cy="todo-item-title"
              >
                {item.title}
              </h2>
            </div>
            <div className=" mr-32 flex items-center justify-center">
              <button
                onClick={() => deleteTodo(item.id)}
                data-cy="todo-item-delete-button"
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
        ))}
    </>
  );
}
