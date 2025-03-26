/* eslint-disable @next/next/no-img-element */
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { UserCircle, Bell, Calendar as CalendarIcon, Users, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

export function WelcomeHeader() {
  const { user, loading } = useAuth();
  const [date, setDate] = useState<Date>(new Date());

  if (loading) {
    return <WelcomeHeaderSkeleton />;
  }

  const stats = [
    {
      icon: <Users className="h-4 w-4" />,
      label: "Candidats actifs",
      value: "24",
    },
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      label: "Entretiens prévus",
      value: "8",
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      label: "Postes ouverts",
      value: "12",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <Card className="overflow-hidden bg-[#2C9CC6] opacity-90">
          <div className="relative">
            <div className="absolute inset-0" />
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                  {user?.profile ? (
                    <img
                      src={user.profile}
                      alt={user.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <UserCircle className="w-16 h-16 text-white" />
                  )}
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-lg text-white/80">Bienvenue</p>
                    <h2 className="text-3xl font-bold text-white">
                      {user?.name?.split(" ")[0]}
                    </h2>
                  </div>
                  <p className="text-white/80 leading-relaxed text-lg max-w-lg">
                    Optimisez votre processus de recrutement avec notre système ATS intégré.
                    Gérez efficacement vos candidats et leurs référents.
                  </p>
                </div>
                <button
                  title='Notifications'
                  className="shrink-0 bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                      {stat.icon}
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-b from-background to-muted/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Calendrier</h3>
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md"
          />
        </Card>
      </div>
    </div>
  );
}

function WelcomeHeaderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[2fr,1fr] gap-6">
        <Card className="p-6">
          <div className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-40" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </Card>
      </div>
    </div>
  );
}