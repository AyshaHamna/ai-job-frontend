import { Job } from "@/types/job";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) console.error("API URL is not set");

export const getJobs = async () => {
  const res = await fetch(
    `${API_URL}/jobs`,
    {
      method: "GET",
    }
  );
  const data: Job[] = await res.json();
  return data;
};

export const getJobById = async (
  id: string | undefined,
  token: string | null | undefined
) => {
  const res = await fetch(
    `${API_URL}/jobs/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: Job = await res.json();
  return data;
};

export const createJob = async (
  {
    title,
    description,
    type,
    location,
    questions,
  }: {
    title: string;
    description: string;
    type: string;
    location: string;
    questions: string[];
  },
  token: string | null | undefined
) => {
  await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });
};
