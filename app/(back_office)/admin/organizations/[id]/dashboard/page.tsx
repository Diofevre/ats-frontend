'use client'

import React from 'react';
import DashboardByOrganisation from './_components/DBODashboard';
import { useParams } from 'next/navigation';

const Dashboard = () => {
  const { id } = useParams();
  const organizationId = Number(id);

  return (
    <div className="min-h-screen">
      <DashboardByOrganisation organisationId={organizationId} />
    </div>
  );
}

export default Dashboard;