"use client";
import React, { useContext, useEffect, useState } from "react";
import Add_Collection from "./Add_Collection";
import Card from "../Card";
import Context from "@/contextApi/Context";
import { useRouter } from "next/navigation";
import stockApi from "@/api/stock";

function Home() {
  const router = useRouter();
  const [query, setquery] = useState("");
  const { user, setuser, allCollections, setallCollections } =
    useContext(Context);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }

    (async function fetchCollections() {
      const response = await stockApi.getAllCollections();
      if (response.statusCode == 200) setallCollections(response.data);
    })();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex w-full m-auto mt-5 space-x-2 md:w-1/3 justify-center">
        <input
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="flex h-10 w-full rounded-md border bg-white border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search"
        ></input>
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => {
            router.push(`/search?id=${query}`);
          }}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {allCollections?.length > 0 ? (
          allCollections?.map((collection) => {
            return (
              <Card
                key={collection._id}
                name={collection.name}
                desc={collection.desc}
                id={collection._id}
                shareCollection={true}
                date={new Date(collection.createdAt).toLocaleDateString()}
              />
            );
          })
        ) : (
          <div className="w-full">
            <p className="w-96 mt-5 m-auto text-gray-500">
              Please add a collection.....
            </p>
          </div>
        )}

        <Add_Collection />
      </div>
    </div>
  );
}

export default Home;
