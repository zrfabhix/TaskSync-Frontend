import shareService from "@/api/share";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ShareModal({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { setshare, share, id } = props;
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setshare(false);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shareService.getUser({ email });
      if (response.statusCode == 200) {
        const data = await shareService.shareCollection({
          collectionId: id,
          email: email,
        });
        if (data.statusCode == 200) {
          toast.success("Shared Successfully");
        }
      } else {
        toast.error("Failed to get User");
      }
    } catch (e) {
      toast.error("Failed to Share");
    }

    closeModal();
  };
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Share</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;
