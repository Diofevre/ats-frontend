/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@/hooks/use-auth';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';
import React, { useState } from 'react';

const WelcomeUser = () => {
  const { user, loading } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (loading) {
    return (
      <div className="w-full h-screen p-4">
        <div className="h-32 bg-indigo-50 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-6 bg-gradient-to-br from-[#2C9CC6]/20 to-white dark:from-[#2C9CC6] dark:to-background">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full">
              {user?.profile ? (
                <img
                  src={user.profile}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="w-6 h-6 text-indigo-600" />
              )}
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg text-muted-foreground">Bonjour</span>
                <h2 className="text-xl font-semibold uppercase">
                  {user?.name?.split(" ")[0]}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-xl">
                ATS est une solution complète qui vous aide à attirer, évaluer et embaucher les meilleurs talents de manière efficace et collaborative.
              </p>
            </div>
          </div>
        </Card>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default WelcomeUser;