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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lead List</h2>
        <button
          onClick={() => setAddNewLeadPopup(true)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Add New Lead
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or status"
            className="border rounded px-3 py-2 text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm font-medium">
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Created</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4 text-gray-600">{lead.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : lead.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(lead.created).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No leads found. Add a new lead to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Update Lead Status
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoIosCloseCircleOutline size={24} />
              </button>
            </div>
            <p className="mb-4 text-gray-600">
              Updating status for:{" "}
              <span className="font-semibold text-gray-800">
                {selectedLead.name}
              </span>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, status: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <button
                onClick={() => handleStatusChange(selectedLead.status)}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Update Status
              </button>
            </div>
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
