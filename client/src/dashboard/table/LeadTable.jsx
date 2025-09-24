import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

const LeadTable = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [addNewLeadPopup, setAddNewLeadPopup] = useState(null);

  const [search, setSearch] = useState("");

  const getLeadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leads");
      setLeads(response.data.results);
    } catch (err) {
      console.error("Login failed");
    }
  };

  const handleStatusChange = async (status) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, status } : lead
      )
    );

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/leads/lead-status-update/${selectedLead.id}`,
        {
          status,
        }
      );
      window.alert(response.data.message);
    } catch (err) {
      console.error("Login failed");
    }

    setSelectedLead(null);
  };

  const filteredData = leads.filter((lead) => {
    return (
      lead?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      lead?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
      lead?.status?.toLowerCase()?.includes(search?.toLowerCase())
    );
  });

  const handleAddNewLead = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/leads", {
        name,
        email,
      });
      window.alert(response.data.message);
      setName("");
      setEmail("");
      setAddNewLeadPopup(false);
      getLeadData();
    } catch (err) {
      console.error("Add Lead failed");
    }
  };

  useEffect(() => {
    getLeadData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Lead List</h2>
      <button
        onClick={() => setAddNewLeadPopup(true)}
        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New
      </button>

      <div className="overflow-x-auto">
        {/* Search Box */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or status"
          className="border rounded px-3 py-2 text-sm w-full md:w-64"
          required
        />

        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{lead.name}</td>
                  <td className="p-3 border">{lead.email}</td>
                  <td className="p-3 border">{lead.status}</td>
                  <td className="p-3 border">
                    {new Date(lead.created).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Update Status</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="bg-white text-black px-0 py-1 rounded  text-lg"
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <p className="mb-2">
              Lead: <span className="font-semibold">{selectedLead.name}</span>
            </p>
            <select
              value={selectedLead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      )}
      {addNewLeadPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Add New Lead</h3>

              <button
                onClick={() => {
                  setName("");
                  setEmail("");
                  setAddNewLeadPopup(false);
                }}
                className="bg-white text-black px-0 py-1 rounded  text-lg"
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              onClick={handleAddNewLead}
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-2"
            >
              Create New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;
