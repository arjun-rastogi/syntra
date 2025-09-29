import React from "react";
import LeadTable from "../table/LeadTable";

const LeadList = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
          <p className="text-gray-600">Manage and track your sales leads</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <LeadTable />
        </div>
      </div>
    </div>
  );
};

export default LeadList;
