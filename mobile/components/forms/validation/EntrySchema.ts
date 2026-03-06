import * as yup from "yup";

export const entrySchema = yup.object({
  subject: yup
    .string()
    .required("Subject is required")
    .max(50, "Subject max 50 characters"),
  duration: yup
    .number()
    .min(1, "Duration is required at least 1 minute")
    .required(),
  mood: yup.string().required("Mood is required"),
  focus: yup.number().min(1).max(5).required("Focus is required"),
  details: yup.string().optional().max(10000, "Details max 10000 characters"),
});
