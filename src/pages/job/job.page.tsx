import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getJobById } from "@/lib/services/api/jobs";
import { createJobApplication } from "@/lib/services/api/jobApplications";
import { Job } from "@/types/job";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Briefcase, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const { id } = useParams();
  //console.log(id); //Gives us the value of the route param.
  const auth = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  useEffect(() => {
    console.log("id ", id);
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (!id) return;

    async function fetchData() {
      const token = await auth.getToken();
      await getJobById(id, token)
        .then((data) => {
          setJob(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }

    fetchData();
  }, [id, isLoaded, isSignedIn, navigate]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;
    if (!id) return;
    const token = await auth.getToken();
    await createJobApplication(
      {
        userId: user.id,
        fullName: formData.fullName,
        job: id,
        answers: [formData.a1, formData.a2, formData.a3],
      },
      token
    );
    navigate("/");
  };

  if (isLoading || job === null) {
    console.log(isLoading);
    console.log(job);
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job.description}</p>
      </div>
      <Separator />
      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Full Name</h3>
          <Input
            className="mt-2"
            value={formData.fullName}
            name="fullName"
            onChange={handleChange}
            required
          />
        </div>
        {job.questions.map((question, i) => {
          return (
            <div key={i} className="mt-4">
              <h3>{question}</h3>
              <Textarea
                className="mt-2"
                name={`a${i + 1}`}
                onChange={handleChange}
                required
              />
            </div>
          );
        })}
        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default JobPage;
