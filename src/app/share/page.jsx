"use client";
import React, { useContext, useEffect, useState } from "react";
import Context from "@/contextApi/Context";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import authService from "@/api/auth";
import toast from "react-hot-toast";
import shareService from "@/api/share";

// Renamed the component to start with an uppercase letter
function PageComponent() {
  const router = useRouter();
  const [query, setQuery] = useState("");  // Fixed the camelCase naming convention
  const { user, setUser } = useContext(Context); // Fixed the camelCase naming convention

  const [allCollections, setAllCollections] = useState([]); // Fixed the camelCase naming convention

  async function getAllCollections() {
    try {
      const userResponse = await authService.me();
      if (userResponse.statusCode === 200) {
        const allCollectionsResponse = await shareService.fetchCollections({
          collectionsId: userResponse?.data.shared,
        });

        setAllCollections(allCollectionsResponse.data);
      }
    } catch (e) {
      toast.error("Error while fetching collections");
    }
  }

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      getAllCollections();
    }
  }, [user, router]); // Added router as a dependency to re-run the effect when router changes

  return (
    <div className="flex flex-col">
      <div className="bg-gray-500 text-white p-4 m-auto rounded-lg mt-3">
        <h1 className="text-xl ">Shared Collections</h1>
      </div>
      <div className="flex flex-wrap">
        {allCollections.length > 0 ? (
          allCollections?.map((collection) => (
            <Card
              key={collection._id}
              name={collection.name}
              desc={collection.desc}
              id={collection._id}
              user={collection.user}
              othercollections={allCollections}
              setothercollections={setAllCollections}
              shareCollection={false}
              date={new Date(collection.createdAt).toLocaleDateString()}
            />
          ))
        ) : (
          <div className="w-full">
            <p className="w-96 mt-5 m-auto text-gray-500">
              Nothing to show here ....
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageComponent;
