import { JobDetails } from "@/types/job";
import { JobApplication } from "@/types/jobApplication";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationCard from "./components/JobApplicationCard";
import { getJobById } from "@/lib/services/api/jobs";
import { getJobApplicationsForJob } from "@/lib/services/api/jobApplications";
import { useAuth, useSession } from "@clerk/clerk-react";

function AdminJobPage() {
  const [job, setJob] = useState<JobDetails | null>(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<Array<JobApplication>>(
    []
  );
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] =
    useState(true);

  const { id } = useParams();
  const auth = useAuth();
  const session = useSession();

  useEffect(() => {
    const role = session?.session?.user.publicMetadata.role;
    if (!id) {
      return;
    }

    if (role !== "admin") {
      return;
    }

    async function fetchData() {
      const token = await auth.getToken();

      getJobById(id, token)
        .then((data) => {
          setJob(data as JobDetails);
          setIsJobLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsJobLoading(false);
        });

      getJobApplicationsForJob(id, token)
        .then((data) => {
          setJobApplications(data);
          setIsJobApplicationsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsJobApplicationsLoading(false);
        });
    }
    fetchData();
  }, [id, auth]);

  if (isJobLoading || isJobApplicationsLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={id!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminJobPage;
