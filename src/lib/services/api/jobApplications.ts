import { JobApplication } from "@/types/jobApplication";

export const getJobApplicationsForJob = async (
  id: string | undefined,
  token: string | null | undefined
) => {
  //console.log("job application id: ", id);

  const res = await fetch(`http://localhost:8000/jobApplications?jobId=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: JobApplication[] = await res.json();

  return data;
};

export const getJobApplicationById = async (
  id: string | undefined,
  token: string | null | undefined
) => {
  const res = await fetch(`http://localhost:8000/jobapplications/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: JobApplication = await res.json();
  return data;
};

export const createJobApplication = async (
  {
    userId,
    fullName,
    job,
    answers,
  }: {
    userId: string;
    fullName: string;
    job: string;
    answers: string[];
  },
  token: string | null | undefined
) => {
  await fetch(`http://localhost:8000/jobapplications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      fullName: fullName,
      job,
      answers,
    }),
  });
};
