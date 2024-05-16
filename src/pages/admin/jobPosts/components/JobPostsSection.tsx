import JobCard from "@/components/shared/JobCard";
import { getJobs } from "@/lib/services/api/jobs";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";

function JobPostsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchData() {
      await getJobs()
        .then((data) => setJobs(data as Job[]))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <section className="py-8">
      <h2>Current Job Postings</h2>
      <div className="mt-4 flex flex-col gap-y-4">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              isAdmin={true}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobPostsSection;
