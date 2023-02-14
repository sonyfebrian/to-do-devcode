import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TutorialDataService from "../serviceapi/serviceApi";
import todo from "../image/empty.png";

export default function DetailPage() {
  let { id } = useParams();
  const [detail, setDetail] = useState();

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

  useEffect(() => {
    if (id) getTodo(id);
  }, [id]);

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
                    {detail.title}
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
              <div
                className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative"
                data-cy="todo-empty-state"
              >
                <img
                  id="TextEmptyTodo"
                  alt="gallery"
                  className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="https://dummyimage.com/542x420"
                />
                <div className="text-center relative z-10 w-full">
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                    Shooting Stars
                  </h2>
                  <p className="leading-relaxed">
                    Skateboard +1 mustache fixie paleo lumbersexual.
                  </p>
                  <a className="mt-3 text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full  py-32 px-32 relative mt-4">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block  absolute inset-0"
              src={todo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
