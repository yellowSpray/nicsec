import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstname: z.string().min(3, { message: "Name to short !" }),
  email: z.string().email({ message: "Email not valid !" }),
  phone: z.string().min(9, { message: "Phone number not valid" }),
  subject: z.string().min(1, "Please select a subject."),
  description: z.string().min(25, { message: "Description is not enough" }),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form
      className={"w-full h-full px-7 p-5 rounded-second bg-background"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4>Get Free Consultation</h4>
      <div className="w-full h-full flex flex-col items-center gap-1">

        <div className="w-full flex flex-row gap-2">
          <fieldset className={"w-full flex flex-col justify-center"}>
            <label>Name</label>
            <input
              {...register("firstname")}
              type="text"
              placeholder="Your full name."
              className="w-full border-gray-300 border-1 rounded-lg p-2"
              aria-invalid={errors.firstname ? "true" : "false"}
            />
            {errors.firstname && (
              <p className="text-red-600 text-sm">
                * {errors.firstname.message}
              </p>
            )}
          </fieldset>

          <fieldset className={"w-full flex flex-col justify-center"}>
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="your@email.com"
              className="border-gray-300 border-1 rounded-lg p-2"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">* {errors.email.message}</p>
            )}
          </fieldset>
        </div>

        <div className="w-full flex flex-row gap-2">
          <fieldset className={"w-full flex flex-col justify-center"}>
            <label>Phone</label>
            <input
              {...register("phone", { required: true })}
              type="text"
              placeholder="+32XXXXXXX"
              className="border-gray-300 border-1 rounded-lg p-2"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">* {errors.phone.message}</p>
            )}
          </fieldset>

          <fieldset className="w-full flex flex-col justify-center">
            <label htmlFor="subject">Select Subject</label>
            <select
              {...register("subject", { required: "Please select a subject." })}
              className="border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.subject ? "true" : "false"}
              defaultValue=""
            >
              <option value="" disabled>
                Select a case
              </option>
              <option value="surveillance">Surveillance</option>
              <option value="infidelity">Infidelity Investigation</option>
              <option value="background">Background Check</option>
              <option value="missing">Missing Person</option>
              <option value="fraud">Fraud Investigation</option>
            </select>

            {errors.subject && (
              <p className="text-red-600 text-sm">* {errors.subject.message}</p>
            )}
          </fieldset>
        </div>

        <fieldset className="w-full flex flex-col justify-center">
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "This field is required.",
            })}
            placeholder="Describe your case"
            className="border border-gray-300 rounded-lg p-2 resize-none min-h-[170px]"
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p className="text-red-600 text-sm">
              * {errors.description.message}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="w-full p-4 z-10 rounded-second bg-second text-white text-sm"
        >
          Send
        </button>
      </div>
    </form>
  );
}
