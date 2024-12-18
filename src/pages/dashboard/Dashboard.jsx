import { Card } from "../../components";
import React from "react";

const Dashboard = () => {
  const cards = [
    { label: "Total Employees", value: 1 },
    { label: "Users Logged In Today", value: 0 },
    { label: "Employees On Leave Today", value: 0 },
  ];

  return (
    <div>
      {/* Breadcrumb Component */}
      {/* <Breadcrumb /> */}

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card key={index} label={card.label} value={card.value} />
          ))}
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* <TopPerformersCard />
          <AnnouncementsCard />
          <BirthdaysCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
