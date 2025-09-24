import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

const TaskTable = () => {
  const [name, setName] = useState("");

  const [tasks, setTasks] = useState([]);
  const [TeamData, setTeamData] = useState([]);
  const [selectedtask, setSelectedtask] = useState(null);
  const [search, setSearch] = useState("");
  const [addNewLeadPopup, setAddNewLeadPopup] = useState(null);

  const getTeamData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teams");
      setTeamData(response.data.results);
    } catch (err) {
      console.error("Login failed");
    }
  };

  const getTaskData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data.results);
    } catch (err) {
      console.error("Login failed");
    }
  };

  const handleStatusChange = async (assigned_id) => {
    let teamMember = TeamData?.find((t) => t.id == assigned_id);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedtask.id
          ? {
              ...task,
              assigned_id,
              assigned_to: teamMember?.name || "",
              status: assigned_id ? "Assigned" : "New",
            }
          : task
      )
    );

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/task-status-update/${selectedtask.id}`,
        {
          assigned_id,
          assigned_to: teamMember?.name || "",
          status: assigned_id ? "Assigned" : "New",
        }
      );
      window.alert(response.data.message);
    } catch (err) {
      console.error("Login failed");
    }

    setSelectedtask(null);
  };

  const filteredData = tasks.filter((task) => {
    return task?.name?.toLowerCase()?.includes(search?.toLowerCase());
  });

  const handleAddNewTask = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        name,
      });
      window.alert(response.data.message);
      setName("");
      setAddNewLeadPopup(false);
      getTaskData();
    } catch (err) {
      console.error("Add Task failed");
    }
  };

  useEffect(() => {
    getTeamData();
    getTaskData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Task List</h2>
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
          placeholder="Search by task name"
          className="border rounded px-3 py-2 text-sm w-full md:w-64"
          required
        />

        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Assigned To</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{task.name}</td>
                  <td className="p-3 border">{task.assigned_to}</td>
                  <td className="p-3 border">{task.status}</td>
                  <td className="p-3 border">
                    {new Date(task.created).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => setSelectedtask(task)}
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
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedtask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Assign Task</h3>
              <button
                onClick={() => setSelectedtask(null)}
                className="bg-white text-black px-0 py-1 rounded  text-lg"
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <p className="mb-2">
              Task: <span className="font-semibold">{selectedtask.name}</span>
            </p>
            <select
              value={selectedtask.assigned_id}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {TeamData?.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
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
            <button
              onClick={handleAddNewTask}
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

export default TaskTable;
