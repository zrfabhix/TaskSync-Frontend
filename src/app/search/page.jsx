"use client";
import stockApi from "@/api/stock";
import Card from "@/components/Card";
import Context from "@/contextApi/Context";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function Page() {
  const query = useSearchParams();
  const id = query.get("id");

  const { allCollections, setallCollections } = useContext(Context);

  useEffect(() => {
    (async function search() {
      if (id) {
        try {
          const response = await stockApi.searchCollection(id);
          setallCollections(response.data);
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
      }
    })();
  }, [id]);

  return (
    <>
      <h1 className="m-5">Searching results for {id} .....</h1>
      <div className="flex flex-wrap">
        {allCollections.length > 0 ? (
          allCollections.map((collection) => (
            <Card
              key={collection._id}
              name={collection.name}
              desc={collection.desc}
              id={collection._id}
            />
          ))
        ) : (
          <p className="ml-5">No collections found</p>
        )}
      </div>
    </>
  );
}

export default Page;
