import Hero from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post a Job | wemake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  companyName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
  jobLocation: z.enum(
    LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
  ),
  salaryRange: z.enum(SALARY_RANGE as [string, ...string[]]),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = await makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    console.log(error?.flatten());
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form
        className="max-w-screen-2xl mx-auto flex flex-col items-center gap-10"
        method="POST"
      >
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Senior React Developer"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.position}</p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="i.e We are looking for a Senior React Developer"
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.overview}</p>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma seperated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Implement new features, Maintain code quality, etc"
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.responsibilities}
            </p>
          )}
          <InputPair
            id="qulifications"
            label="Qulifications"
            description="(400 characters max, comma seperated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="i.e 3+ years fo experience, Strong TypeScript skills, etc"
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.qualifications}
            </p>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma seperated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Flexible working hours, Health insurance, etc"
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma seperated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="i.e React, TypeScript, etc."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.skills}</p>
          )}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Tesla"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.companyName}</p>
          )}
          <InputPair
            id="companyLogoURL"
            label="Company Logo URL"
            description="(only URL)"
            name="companyLogoUrl"
            type="url"
            required
            placeholder="i.e https://github.com/tesla.png"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLogoUrl}
            </p>
          )}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Remote, New York, etc."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.companyLocation}
            </p>
          )}
          <InputPair
            id="applyURL"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://wemake.services/apply"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of the job"
            name="jobType"
            required
            placeholder="Select the type of the job"
            options={JOB_TYPES.map((type) => type)}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.jobType}</p>
          )}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => location)}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.jobLocation}</p>
          )}
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
        </div>
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">{actionData.fieldErrors.salaryRange}</p>
        )}
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
