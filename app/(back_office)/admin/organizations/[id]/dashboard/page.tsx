'use client'

import React from 'react';
import { Users, Building2, Briefcase, UserCheck } from 'lucide-react';
import { useDashboard } from '@/hooks/use-dashboard';
import { TopList } from './list';
import { DashboardCard } from './card';

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Dashboard Overview</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Users"
            value={data.users.total}
            icon={<Users size={24} />}
          />
          <DashboardCard
            title="Organizations"
            value={data.organisations.total}
            icon={<Building2 size={24} />}
          />
          <DashboardCard
            title="Total Offers"
            value={data.offres.total}
            icon={<Briefcase size={24} />}
          />
          <DashboardCard
            title="Total Candidates"
            value={data.candidates.total}
            icon={<UserCheck size={24} />}
          />
        </div>

        {/* Detailed Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopList
            title="Top Organizations by Users"
            items={data.organisations.topByUsers.map(org => ({
              name: org.name,
              count: org.userCount
            }))}
            countLabel="users"
          />
          
          <TopList
            title="Top Job Offers"
            items={data.offres.topByPostulations.map(offre => ({
              title: offre.title,
              count: offre.postulationCount
            }))}
            countLabel="applications"
          />
          
          <TopList
            title="Top Candidates"
            items={data.candidates.topByPostulations.map(candidate => ({
              name: candidate.name,
              count: candidate.postulationCount
            }))}
            countLabel="applications"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;