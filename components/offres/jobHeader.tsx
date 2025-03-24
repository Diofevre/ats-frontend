import HeaderSkeleton from "@/components/offres/headerSkeleton";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface Job {
  titre?: string;
  lieu?: string;
  type_emploi?: string;
  created_at?: string;
}

interface JobHeaderProps {
  job: Job | undefined;
  isLoading: boolean;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, isLoading }) =>
  isLoading ? (
    <HeaderSkeleton />
  ) : (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center space-x-2 text-blue-600 text-sm font-medium mb-4">
        <Briefcase className="h-4 w-4" />
        <span>Offre d'emploi</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{job?.titre}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-3 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Localisation</p>
            <p className="text-sm">{job?.lieu}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Type de poste</p>
            <p className="text-sm">{job?.type_emploi}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-3 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Date de début</p>
            <p className="text-sm">
              {job?.created_at
                ? new Date(job.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

export default JobHeader;
