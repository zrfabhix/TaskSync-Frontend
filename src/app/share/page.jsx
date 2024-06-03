"use client";
import React, { useContext, useEffect, useState } from "react";
import Context from "@/contextApi/Context";
import { useRouter } from "next/navigation";
import stockApi from "@/api/stock";
import Card from "@/components/Card";
import authService from "@/api/auth";
import toast from "react-hot-toast";
import shareService from "@/api/share";

function page() {
  const router = useRouter();
  const [query, setquery] = useState("");
  const { user, setuser } = useContext(Context);

  const [allCollections, setallCollections] = useState([]);

  async function getAllCollections() {
    try {
      const user = await authService.me();
      if (user.statusCode == 200) {
        const allCollections = await shareService.fetchCollections({
          collectionsId: user?.data.shared,
        });

        setallCollections(allCollections.data);
      }
    } catch (e) {
      toast.error("Error while fetching collections");
    }
  }

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    getAllCollections();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-500 text-white p-4 m-auto rounded-lg mt-3">
        <h1 className="text-xl ">Shared Collections</h1>
      </div>
      <div className="flex flex-wrap">
        {allCollections.length > 0 ? (
          allCollections?.map((collection) => {
            return (
              <Card
                key={collection._id}
                name={collection.name}
                desc={collection.desc}
                id={collection._id}
                user={collection.user}
                othercollections={allCollections}
                setothercollections={setallCollections}
                shareCollection={false}
                date={new Date(collection.createdAt).toLocaleDateString()}
              />
            );
          })
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

export default page;
