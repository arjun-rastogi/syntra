import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

const TeamTable = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/teams");
      setTeams(response.data.results || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch team data:", err);
      setError("Failed to load team data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeamMember = async () => {
    if (!name.trim() || !email.trim()) {
      window.alert("Please fill in all required fields");
      return;
    }

    try {
      if (selectedTeam) {
        // Update existing team member
        const response = await axios.patch(
          `http://localhost:5000/api/teams/${selectedTeam.id}`,
          {
            name: name.trim(),
            email: email.trim(),
            status: "Active",
          }
        );
        window.alert(response.data.message);
      } else {
        // Add new team member
        const response = await axios.post("http://localhost:5000/api/teams", {
          name: name.trim(),
          email: email.trim(),
          status: "Active",
        });
        window.alert(response.data.message);
      }

      // Reset form and refresh data
      setName("");
      setEmail("");
      setSelectedTeam(null);
      setShowAddForm(false);
      await getTeamData();
    } catch (err) {
      console.error("Operation failed:", err);
      window.alert(
        err.response?.data?.message || "Operation failed. Please try again."
      );
    }
  };

  const filteredTeams = teams.filter((team) => {
    return (
      team?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      team?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
      team?.status?.toLowerCase()?.includes(search?.toLowerCase())
    );
  });

  useEffect(() => {
    getTeamData();
  }, []);

  // Load team data when editing
  useEffect(() => {
    if (selectedTeam) {
      setName(selectedTeam.name || "");
      setEmail(selectedTeam.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [selectedTeam]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        <p>{error}</p>
        <button
          onClick={getTeamData}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Add Team Member
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

        {filteredTeams.length === 0 && !isLoading ? (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "No team members match your search."
              : "No team members found. Add a new team member to get started."}
          </div>
        ) : (
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
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4 font-medium">{team.name}</td>
                  <td className="p-4 text-gray-600">{team.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        team.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {team.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(team.created).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedTeam(team);
                        setShowAddForm(true);
                      }}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {selectedTeam ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button
                onClick={() => {
                  setName("");
                  setEmail("");
                  setSelectedTeam(null);
                  setShowAddForm(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <IoIosCloseCircleOutline size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setSelectedTeam(null);
                    setShowAddForm(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTeamMember}
                  disabled={!name.trim() || !email.trim()}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {selectedTeam ? "Update" : "Add"} Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamTable;
