import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation, Trans } from "react-i18next";
import { toast } from "sonner";

// "Vous nous contactez comme" (content document, section 9.2)
const CLIENT_TYPES = ["individual", "company", "insurer", "professional", "other"] as const;

const inputClass = "w-full border border-gray-300 rounded-lg p-2";

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
    company: z.string().trim().max(150, { message: t("errors.fieldTooLong") }).optional(),
    role: z.string().trim().max(100, { message: t("errors.fieldTooLong") }).optional(),
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
    clientType: z.enum(CLIENT_TYPES, { message: t("errors.clientTypeRequired") }),
    subject: z
      .string()
      .trim()
      .min(3, { message: t("errors.subjectRequired") })
      .max(150, { message: t("errors.fieldTooLong") }),
    description: z
      .string()
      .trim()
      .min(1, { message: t("errors.descriptionRequired") })
      .min(25, { message: t("errors.descriptionTooShort") })
      .max(5000, { message: t("errors.descriptionTooLong") }),
    consent: z.boolean().refine((value) => value === true, { message: t("errors.consentRequired") }),
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
    defaultValues: { consent: false },
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

  /** Error message under a field, linked to it for screen readers */
  const fieldError = (name: keyof FormData) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="text-red-600 text-sm">
        * {errors[name]?.message}
      </p>
    );

  const a11y = (name: keyof FormData) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? ("true" as const) : ("false" as const),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form
      className="w-full h-full flex flex-col justify-start rounded-second space-y-6 bg-background p-5 sm:p-7"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Honeypot: off-screen, not focusable, ignored by screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input {...register("website")} id="contact-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="w-full flex lg:flex-row flex-col gap-6 lg:gap-2">
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-fullname">{t("form.name")}</label>
          <input {...register("fullname")} {...a11y("fullname")} type="text" autoComplete="name"
            placeholder={t("form.namePlaceholder")} className={inputClass} />
          {fieldError("fullname")}
        </fieldset>
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-email">{t("form.email")}</label>
          <input {...register("email")} {...a11y("email")} type="email" autoComplete="email"
            placeholder={t("form.emailPlaceholder")} className={inputClass} />
          {fieldError("email")}
        </fieldset>
      </div>

      <div className="w-full flex lg:flex-row flex-col gap-6 lg:gap-2">
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-phone">{t("form.phone")}</label>
          <input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel"
            placeholder={t("form.phonePlaceholder")} className={inputClass} />
          {fieldError("phone")}
        </fieldset>
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-clientType">{t("form.clientTypeTitle")}</label>
          <select {...register("clientType")} {...a11y("clientType")} className={inputClass} defaultValue="">
            <option value="" disabled>{t("form.clientTypeDefault")}</option>
            {CLIENT_TYPES.map((key) => (
              <option key={key} value={key}>{t(`form.clientType.${key}`)}</option>
            ))}
          </select>
          {fieldError("clientType")}
        </fieldset>
      </div>

      <div className="w-full flex lg:flex-row flex-col gap-6 lg:gap-2">
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-company">{t("form.company")}</label>
          <input {...register("company")} {...a11y("company")} type="text" autoComplete="organization"
            placeholder={t("form.companyPlaceholder")} className={inputClass} />
          {fieldError("company")}
        </fieldset>
        <fieldset className="w-full flex flex-col">
          <label className="sr-only" htmlFor="contact-role">{t("form.role")}</label>
          <input {...register("role")} {...a11y("role")} type="text" autoComplete="organization-title"
            placeholder={t("form.rolePlaceholder")} className={inputClass} />
          {fieldError("role")}
        </fieldset>
      </div>

      <fieldset className="w-full flex flex-col">
        <label className="sr-only" htmlFor="contact-subject">{t("form.subject")}</label>
        <input {...register("subject")} {...a11y("subject")} type="text"
          placeholder={t("form.subjectPlaceholder")} className={inputClass} />
        {fieldError("subject")}
      </fieldset>

      <fieldset className="w-full flex flex-col gap-2">
        <label className="sr-only" htmlFor="contact-description">{t("form.description")}</label>
        <textarea {...register("description")} {...a11y("description")} maxLength={5000}
          placeholder={t("form.descriptionPlaceholder")}
          className={`${inputClass} resize-none min-h-[100px]`} />
        {fieldError("description")}
        {/* 9.3: warning under the message field */}
        <p className="text-xs text-main/70">{t("form.warning")}</p>
      </fieldset>

      <fieldset className="w-full flex flex-col gap-1">
        <label htmlFor="contact-consent" className="flex flex-row items-start gap-2 text-sm cursor-pointer">
          <input {...register("consent")} {...a11y("consent")} type="checkbox" className="mt-1 shrink-0 accent-second" />
          <span>
            <Trans
              i18nKey="form.consent"
              components={{
                // New tab, so the form content is not lost
                l: <a href="/vie-privee" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-second" />,
              }}
            />
          </span>
        </label>
        {fieldError("consent")}
      </fieldset>

      <div className="space-y-2">
        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? t("form.sending") : t("form.send")}
        </button>
        {/* 9.4: notice under the button */}
        <p className="text-xs text-main/70 text-center">{t("form.notice")}</p>
      </div>
    </form>
  );
}
