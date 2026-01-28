import * as yup from "yup";

export const entrySchema = yup.object({
  subject: yup.string().required("Subject is required"),
  hours: yup.number().transform((_, v) => (v === "" ? 0 : Number(v))),
  minutes: yup.number().transform((_, v) => (v === "" ? 0 : Number(v))),
  mood: yup.string().oneOf(
    ["awful", "bad", "meh", "good", "amazing"],
    "Mood is required"
  ).required("Mood is required"),
  focusLevel: yup.number().transform((_, v) => (v === "" ? undefined : Number(v))).required("Focus level is required"),
  details: yup.string()
})
.test(
    "duration-check",
    "Either hours or minutes must be greater than zero",
    function (values) {
        if (values.hours === 0 && values.minutes === 0) {
            return this.createError({
                path: "hours",
                message: "Either hours or minutes must be greater than zero",
            });
        }
        return true;
    }

);