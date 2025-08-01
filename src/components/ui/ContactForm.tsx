import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();

  const schema = z.object({
    fullname: z.string().min(3, { message: t('errors.nameTooShort') }),
    email: z.string().email({ message: t('errors.emailInvalid') }),
    phone: z.string().min(9, { message: t('errors.phoneInvalid') }),
    subject: z.string().min(1, { message: t('errors.subjectRequired') }),
    description: z
      .string()
      .min(25, { message: t('errors.descriptionTooShort') })
      .refine((val) => !!val, { message: t('errors.descriptionRequired') }),
  });

  type FormData = z.infer<typeof schema>;

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
      className={"w-full h-full px-7 py-5 rounded-second bg-background"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4>{t("form.title")}</h4>
      <div className="w-full h-full flex flex-col items-center justify-around">
        <div className="w-full flex flex-row gap-2">
          <fieldset className={"w-full flex flex-col justify-center"}>
            <label>{t("form.name")}</label>
            <input
              {...register("fullname")}
              type="text"
              placeholder={t("form.namePlaceholder")}
              className="w-full border-gray-300 border-1 rounded-lg p-2"
              aria-invalid={errors.fullname ? "true" : "false"}
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm">
                * {errors.fullname.message}
              </p>
            )}
          </fieldset>

          <fieldset className={"w-full flex flex-col justify-center"}>
            <label>{t("form.email")}</label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder={t("form.emailPlaceholder")}
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
            <label>{t("form.phone")}</label>
            <input
              {...register("phone", { required: true })}
              type="text"
              placeholder={t("form.phonePlaceholder")}
              className="border-gray-300 border-1 rounded-lg p-2"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">* {errors.phone.message}</p>
            )}
          </fieldset>

          <fieldset className="w-full flex flex-col justify-center">
            <label htmlFor="subject">{t("form.subjectTitle")}</label>
            <select
              {...register("subject", { required: "Please select a subject." })}
              className="border border-gray-300 rounded-lg p-2"
              aria-invalid={errors.subject ? "true" : "false"}
              defaultValue=""
            >
              <option value="" disabled>
                {t("form.subjectDefault")}
              </option>
              <option value="surveillance">
                {t("form.subject.surveillance")}
              </option>
              <option value="infidelity">{t("form.subject.infidelity")}</option>
              <option value="background">{t("form.subject.background")}</option>
              <option value="missing">{t("form.subject.missing")}</option>
              <option value="fraud">{t("form.subject.fraud")}</option>
            </select>

            {errors.subject && (
              <p className="text-red-600 text-sm">* {errors.subject.message}</p>
            )}
          </fieldset>
        </div>

        <fieldset className="w-full flex flex-col justify-center">
          <label>{t("form.description")}</label>
          <textarea
            {...register("description", {
              required: "This field is required.",
            })}
            placeholder={t("form.descriptionPlaceholder")}
            className="border border-gray-300 rounded-lg p-2 resize-none min-h-[100px]"
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
          className="w-full relative bottom-2 p-2 rounded-second bg-second text-white text-xs"
        >
          {t("form.send")}
        </button>
      </div>
    </form>
  );
}
