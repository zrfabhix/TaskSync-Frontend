"use client";
import React, { useState } from "react";
import Input from "./Input";
import stockApi from "@/api/stock";
import toast from "react-hot-toast";
import { CheckCircle2, Edit, Trash } from "lucide-react";

function TR({ name, price, category, quantity, id, allstocks, setallstocks }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [updateStock, setupdateStock] = useState(false);

  const [formData, setformData] = useState({
    name: name,
    desc: "",
    price: price,
    quantity: quantity,
    category: category,
    id: id,
    file: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await stockApi.updateStock(formData);

      if (response.statusCode == 200) {
        toast.success("Stock updated successfully");
        closeModal();
        const data = allstocks.map((stock) =>
          stock._id == id ? response.data : stock
        );
        setallstocks(data);
      } else {
        toast.error("Error while updating stock");
      }
    } catch (e) {
      toast.error("Error while saving");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  function updatePrice(tag) {
    setupdateStock(true);
    if (tag == "dec") {
      formData.quantity =
        formData.quantity - 1 > 0 ? formData.quantity - 1 : formData.quantity;
    } else {
      formData.quantity = formData.quantity + 1;
    }

    const stocks = allstocks.map((stock) => {
      if (stock._id == id) {
        stock.quantity = formData.quantity;
      }
      return stock;
    });

    setallstocks(stocks);
  }

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4 font-semibold text-gray-900">{name}</td>

        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => updatePrice("dec")}
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>

            <div>
              <input
                type="number"
                id="first_product"
                disabled
                value={quantity}
                className="bg-gray-50 w-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                placeholder="1"
                required
              />
            </div>

            <button
              onClick={() => updatePrice("inc")}
              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
            {updateStock ? (
              <div className="ml-5">
                <CheckCircle2
                  onClick={(e) => {
                    handleSubmit(e);
                    setupdateStock(!updateStock);
                  }}
                />
              </div>
            ) : null}
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">{price}</td>
        <td className="px-6 py-4 font-semibold text-gray-900">{category}</td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 hover:underline">
            <Edit onClick={() => openModal()} />
          </a>
        </td>

        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 hover:underline">
            <Trash
              onClick={async () => {
                try {
                  console.log(id)
                  const resonse = await stockApi.deleteStock({ id });
                  console.log(resonse)
                  if(resonse.statusCode == 200){
                    toast.success("Stock deleted successfully");
                    const data = allstocks.filter((stock) => stock._id!= id);
                    setallstocks(data);
                  }
                } catch (e) {
                  toast.error("Error deleting stock");
                }
              }}
            />
          </a>
        </td>
      </tr>

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
                  Add Stock
                </h4>
                <p className="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Please fill all fields
                </p>
                <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  Stock
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
                    Stock Name
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

                <Input
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  name={"Price"}
                  formData={formData}
                />

                <Input
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  name={"Quantity"}
                  formData={formData}
                />

                <Input
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  name={"Category"}
                  formData={formData}
                />
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={handleSubmit}
                  className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg
                   hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default TR;
