import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const SUBJECTS = [
  "surveillance",
  "infidelity",
  "background",
  "missing",
  "fraud",
] as const;

export default function ContactForm() {
  const { t } = useTranslation();

  // Anti-spam: time at which the form was displayed (checked server-side)
  const startedAt = useRef(Date.now());

  const schema = z.object({
    fullname: z
      .string()
      .trim()
      .min(3, { message: t("errors.nameTooShort") })
      .max(100, { message: t("errors.nameTooLong") }),
    email: z
      .string()
      .trim()
      .email({ message: t("errors.emailInvalid") })
      .max(254, { message: t("errors.emailInvalid") }),
    phone: z
      .string()
      .trim()
      .min(9, { message: t("errors.phoneInvalid") })
      .max(30, { message: t("errors.phoneInvalid") })
      .regex(/^[+0-9 ()./-]+$/, { message: t("errors.phoneInvalid") }),
    subject: z.enum(SUBJECTS, { message: t("errors.subjectRequired") }),
    description: z
      .string()
      .trim()
      .min(1, { message: t("errors.descriptionRequired") })
      .min(25, { message: t("errors.descriptionTooShort") })
      .max(5000, { message: t("errors.descriptionTooLong") }),
    // Honeypot: hidden from humans, bots tend to fill it
    website: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });

      if (res.ok) {
        toast.success(t("form.confirm"));
        reset();
        startedAt.current = Date.now();
      } else if (res.status === 429) {
        toast.error(t("form.errorRateLimit"));
      } else {
        toast.error(t("form.errorServer"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("form.errorNetwork"));
    }
  };

  return (
    <form
      className={"w-full h-full flex flex-col justify-start rounded-second space-y-8 bg-background p-7"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h4 className="md:mb-5 smd:mb-2">{t("form.title")}</h4>

      <div className="h-full flex flex-col justify-between space-y-8">

        {/* Honeypot: off-screen, not focusable, ignored by screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            {...register("website")}
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="w-full flex lg:flex-row flex-col gap-2">
          <fieldset className={"w-full flex flex-col justify-center"}>
            <label className="sr-only" htmlFor="contact-fullname">{t("form.name")}</label>
            <input
              {...register("fullname")}
              id="contact-fullname"
              type="text"
              autoComplete="name"
              placeholder={t("form.namePlaceholder")}
              className="w-full border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.fullname ? "true" : "false"}
              aria-describedby={errors.fullname ? "contact-fullname-error" : undefined}
            />
            {errors.fullname && (
              <p id="contact-fullname-error" className="text-red-600 text-sm">
                * {errors.fullname.message}
              </p>
            )}
          </fieldset>

          <fieldset className={"w-full flex flex-col justify-center"}>
            <label className="sr-only" htmlFor="contact-email">{t("form.email")}</label>
            <input
              {...register("email")}
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder={t("form.emailPlaceholder")}
              className="w-full border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-red-600 text-sm">* {errors.email.message}</p>
            )}
          </fieldset>
        </div>

        <div className="w-full flex lg:flex-row flex-col gap-2">
          <fieldset className={"w-full flex flex-col justify-center"}>
            <label className="sr-only" htmlFor="contact-phone">{t("form.phone")}</label>
            <input
              {...register("phone")}
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("form.phonePlaceholder")}
              className="w-full border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="text-red-600 text-sm">* {errors.phone.message}</p>
            )}
          </fieldset>

          <fieldset className="w-full flex flex-col justify-center">
            <label className="sr-only" htmlFor="contact-subject">{t("form.subjectTitle")}</label>
            <select
              {...register("subject")}
              id="contact-subject"
              className="w-full border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              defaultValue=""
            >
              <option value="" disabled>{t("form.subjectDefault")}</option>
              {SUBJECTS.map((key) => (
                <option key={key} value={key}>{t(`form.subject.${key}`)}</option>
              ))}
            </select>

            {errors.subject && (
              <p id="contact-subject-error" className="text-red-600 text-sm">* {errors.subject.message}</p>
            )}
          </fieldset>
        </div>

        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-description">{t("form.description")}</label>
          <textarea
            {...register("description")}
            id="contact-description"
            maxLength={5000}
            placeholder={t("form.descriptionPlaceholder")}
            className="w-full border border-gray-300 rounded-lg p-2 resize-none min-h-[100px]"
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={errors.description ? "contact-description-error" : undefined}
          />
          {errors.description && (
            <p id="contact-description-error" className="text-red-600 text-sm">
              * {errors.description.message}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? t("form.sending") : t("form.send")}
        </button>

      </div>

    </form>
  );
}
