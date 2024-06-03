"use client";
import stockApi from "@/api/stock";
import Context from "@/contextApi/Context";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Add_Collection() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setformData] = useState({
    name: "",
    desc: "",
    id: "665ae6f0c13d7b621388489f",
  });

  const { setallCollections , allCollections} = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await stockApi.addCollection(formData);
      setallCollections([...allCollections ,response.data])
      toast.success("Collection added successfully");
    } catch (e) {
      toast.error("Error while saving");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="w-full h-[80vh]">
        <div className="fixed bottom-0 right-0 mr-16 mb-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2312/2312400.png"
            className="w-12 hover:w-14 transition-all cursor-pointer"
            alt="Plus Icon"
            onClick={() => openModal()}
          />
        </div>
      </div>

      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          >
            <div
              className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4 p-6">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Add Collection
                </h4>
                <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Please fill all fields
                </p>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Collection
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=""
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Collection Name
                  </label>
                </div>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Description
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    onChange={handleChange}
                    value={formData.desc}
                    name="desc"
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                  </label>
                </div>

                {/* <form class="max-w-sm">
                  <label for="file-input" class="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                file:bg-gray-50 file:border-0
                file:me-4
                file:py-3 file:px-4
                 dark:file:text-neutral-400"
                  />
                </form> */}
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={handleSubmit}
                  className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg
                   hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Add_Collection;
