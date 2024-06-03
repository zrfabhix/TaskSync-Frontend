import stockApi from "@/api/stock";
import Context from "@/contextApi/Context";
import { CheckSquare, Trash, Edit, Share, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ShareModal from "./ShareModal";
import authService from "@/api/auth";
import shareService from "@/api/share";

function Card({
  name,
  desc,
  id,
  shareCollection,
  othercollections,
  setothercollections,
  user,
  date,
}) {
  const [update, setUpdate] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    id: id,
  });

  const { allCollections, setallCollections } = useContext(Context);

  const handleSubmit = async (e) => {
    if (!formData.name || !formData.id || !formData.desc) {
      toast.error("Please provide all details");
      return;
    }
    try {
      const response = await stockApi.updateCollection(formData);
      const data = allCollections.map((collection) =>
        collection._id === id ? response.data : collection
      );
      setallCollections(data);
      toast.success("Collection updated successfully");
    } catch (e) {
      toast.error("Error updating collection");
      console.log(e);
    }
    setUpdate((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [share, setshare] = useState(false);

  return (
    <div className="m-auto relative flex h-auto flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[24rem]">
      <div className="p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 mb-4 text-gray-900"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          ></path>
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"></path>
        </svg>
        {!update ? (
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
        ) : null}

        {update ? (
          <div className="relative h-11 w-full min-w-[200px] m-2">
            <input
              onChange={handleChange}
              value={formData.name}
              name="name"
              className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-900 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
            />
            <label className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Collection Name
            </label>
          </div>
        ) : null}

        {!update ? (
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {desc}
          </p>
        ) : null}

        {update ? (
          <div className="relative h-11 w-full min-w-[200px] m-2">
            <input
              onChange={handleChange}
              value={formData.desc}
              name="desc"
              className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Description
            </label>
          </div>
        ) : null}
      </div>
      <div className="p-6 pt-0 flex relative">
        <a href="#" className="inline-block">
          <button
            className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button"
            onClick={() => {
              router.push(`/stock/?id=${id}`);
            }}
          >
            Go to Collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
        </a>
        <div className="absolute bottom-0 right-0 m-5">
          <Trash
            onClick={async () => {
              try {
                await stockApi.deleteCollection({ id });
                toast.success("Collection deleted successfully");
                // console.log(data);
                if (othercollections?.length > 0) {
                  const user = await authService.me();
                  if (user.statusCode == 200) {
                    const allCollections = await shareService.fetchCollections({
                      collectionsId: user?.data.shared,
                    });
                    setothercollections(allCollections.data);
                  }
                } else {
                  const data = await stockApi.getAllCollections();
                  setallCollections(data.data);
                }
              } catch (e) {
                console.log(e);
                toast.error("Error deleting collection");
              }
            }}
            size={25}
          />
        </div>
      </div>

      <div className="absolute right-0 m-5 cursor-pointer">
        <>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit mb-2">
            {date}
          </p>
        </>
        {shareCollection ? (
          <>
            <Edit onClick={() => setUpdate((prev) => !prev)} width={25} />
            <div className="mt-5 cursor-pointer">
              <Share2 onClick={() => setshare((prev) => !prev)} width={25} />
            </div>
          </>
        ) : null}
        {update ? (
          <div className="mt-3">
            <CheckSquare onClick={handleSubmit} />
          </div>
        ) : null}
      </div>

      {share ? <ShareModal props={{ setshare, share, id }} /> : null}
    </div>
  );
}

export default Card;
