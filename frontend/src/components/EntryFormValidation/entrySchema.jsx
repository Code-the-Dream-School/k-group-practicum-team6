import * as yup from "yup";

export const entrySchema = yup
  .object({
    subject: yup.string().required("Subject is required"),
    hours: yup
      .number()
      .transform((_, v) => (v === "" || v == null ? undefined : Number(v)))

      .min(0),
    minutes: yup
      .number()
      .transform((_, v) => (v === "" || v == null ? undefined : Number(v)))

      .min(0),
    mood: yup
      .string()
      .oneOf(
        ["Awful", "Not Great", "Okay", "Great", "Amazing"],
        "Mood is required",
      )
      .required("Mood is required"),
    focusLevel: yup
      .number()
      .transform((_, v) => (v === "" ? undefined : Number(v)))
      .required("Focus level is required"),
    details: yup.string(),
  })
  .test("duration-check", "Please select duration", function (values) {
    if (!values) return false;

    const hours = values.hours ?? 0;
    const minutes = values.minutes ?? 0;

    if (hours === 0 && minutes === 0) { 
        return this.createError({
      path: "hours",
      message: "Please select duration",
    }) && this.createError({
      path: "minutes",
      message: "Please select duration",
    });
    
    }
    return true;
  });
