import React from "react";

const StatusBadge = ({ status }) => {
  const color = {
    Paid: "bg-green-500",
    Pending: "bg-red-500",
    Review: "bg-yellow-500",
  }[status] || "bg-gray-500";

  return (
    <span
      className={`inline-block mt-2 px-3 py-1 text-sm text-white rounded-full ${color}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;