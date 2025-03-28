/* eslint-disable @next/next/no-img-element */
'use client';

import { Card } from '@/components/ui/card';
import { UserCircle, Bell, Calendar as CalendarIcon, Users, Briefcase, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

export function WelcomeHeader() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show skeleton only on first mount
  if (!mounted) {
    return <WelcomeHeaderSkeleton />;
  }

  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Candidats actifs",
      value: "24",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: <CalendarIcon className="h-5 w-5" />,
      label: "Entretiens prévus",
      value: "8",
      trend: "+5%",
      trendUp: true,
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Postes ouverts",
      value: "12",
      trend: "-2%",
      trendUp: false,
    },
  ];

  const daysInWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);

  days.forEach((day, index) => {
    const dayIndex = (startingDay + index) % 7;
    if (dayIndex === 0 && index !== 0) {
      weeks.push([...week]);
      week = Array(7).fill(null);
    }
    week[dayIndex] = day;
  });
  if (week.some(day => day !== null)) {
    weeks.push(week);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1.5fr,1fr] gap-6">
        <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="shrink-0 bg-gray-50 rounded-xl p-1 shadow-sm">
                {user?.profile ? (
                  <img
                    src={user.profile}
                    alt={user.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <UserCircle className="w-12 h-12 text-gray-600" />
                )}
              </div>
              <div className="space-y-1.5 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  Bienvenue, {user?.name?.split(" ")[0]} 👋
                </h2>
                <p className='text-sm text-gray-500 leading-relaxed'>
                  Gérez vos recrutements efficacement avec ATS. Voici un aperçu de votre activité aujourd&apos;hui.
                </p>
              </div>
              <div className="relative">
                <button
                  title='Notifications'
                  className="shrink-0 bg-gray-50 p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200 hover:shadow-sm"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer group hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    {stat.icon}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {stat.value}
                    </p>
                    <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trendUp ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">{stat.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Calendrier</h3>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={prevMonth}
                className="p-1.5 hover:bg-white rounded-md transition-all duration-200 hover:shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-600 px-2">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-1.5 hover:bg-white rounded-md transition-all duration-200 hover:shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {daysInWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) => (
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    text-center py-2 text-sm rounded-lg transition-all duration-200
                    ${day === null ? 'text-gray-300' : 'text-gray-700'}
                    ${day === currentDate.getDate() 
                      ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                      : 'hover:bg-gray-50 hover:shadow-sm'}
                    cursor-pointer
                  `}
                >
                  {day}
                </div>
              ))
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function WelcomeHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1.5fr,1fr] gap-6">
        <Card className="p-6 bg-white border border-gray-100">
          <div className="flex gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </Card>
        <Card className="p-6 bg-white border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-8 w-44 rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-md" />
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <Skeleton key={dayIndex} className="h-8 w-full rounded-lg" />
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}