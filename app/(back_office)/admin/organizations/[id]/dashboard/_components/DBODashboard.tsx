import React from 'react';
import {
  Users,
  UserCheck,
  Briefcase,
  Mail,
  Clock,
  DollarSign,
  Building2
} from 'lucide-react';
import { useOrganisationDashboard } from '@/hooks/use-dashbaord-by-organisation';
import { StatCard } from './DBOCard';
import { OffresList } from './DBOList';
import { ProcessusChart } from './DBOCharts';
import LoaderGeneral from '@/components/loader-general';

interface DashboardProps {
  organisationId: number;
}

const DashboardByOrganisation: React.FC<DashboardProps> = ({ organisationId }) => {
  const { dashboard, loading, error } = useOrganisationDashboard(organisationId);

  if (loading) {
    return (
      <LoaderGeneral />
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error || 'Failed to load dashboard'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold uppercase">{dashboard.name} Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={dashboard.totalUsers}
            icon={Users}
          />
          <StatCard
            title="Active Users"
            value={dashboard.totalActiveUsers}
            icon={UserCheck}
          />
          <StatCard
            title="Total Offres"
            value={dashboard.totalOffres}
            icon={Briefcase}
          />
          <StatCard
            title="Pending Invitations"
            value={dashboard.pendingInvitations}
            icon={Mail}
          />
          <StatCard
            title="Average Process Duration"
            value={`${dashboard.avgProcessusDuree} days`}
            icon={Clock}
          />
          <StatCard
            title="Average Salary"
            value={`$${dashboard.avgSalary.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Total Post Carriere"
            value={dashboard.totalPostCarriere}
            icon={Building2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OffresList
            title="Top Offres by Postulations"
            offres={dashboard.top3OffresByPostulations}
            showPostulations
          />
          <OffresList
            title="Recent Offres"
            offres={dashboard.last3Offres}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProcessusChart
            data={dashboard.processusByType}
            total={dashboard.totalProcessus}
          />
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Postulations by Source</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(dashboard.postulationsBySource).map(([source, count]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="capitalize">{source}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardByOrganisation;