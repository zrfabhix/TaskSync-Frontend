"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useSearchParams } from "next/navigation";
import stockApi from "@/api/stock";
import toast from "react-hot-toast";
import TR from "./TR";

function page() {
  const query = useSearchParams();
  const id = query.get("id");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setformData] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    category: "",
    collection: id,
    file: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await stockApi.addStock(formData);
      toast.success("Stock added successfully");
      closeModal();
      getAllStocks();
    } catch (e) {
      toast.error("Error while saving");
      closeModal();
    }
  };

  const [allstocks, setallstocks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  async function getAllStocks() {
    try {
      const response = await stockApi.fetchAllStocks(id);

      setallstocks(response.data);
    } catch (e) {
      toast.error("Error fetching stocks..");
    }
  }

  useEffect(() => {
    getAllStocks();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allstocks.map((stock) => {
              return (
                <TR
                  name={stock.name}
                  price={stock.price}
                  category={stock.category}
                  quantity={stock.quantity}
                  allstocks={allstocks}
                  id={stock._id}
                  formData1={formData}
                  setallstocks={setallstocks}
                />
              );
            })}
          </tbody>
        </table>
      </div>

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
              className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 "
              onClick={closeModal}
            >
              <div
                className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4 p-5">
                  <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Add Stock
                  </h4>

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
                    Add Stock
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}

export default page;
