import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { entrySchema } from "../components/EntryFormValidation/entrySchema";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";

const EntryForm = ({ initialData, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(entrySchema),
  });

  useEffect(() => {
    reset({
      subject: initialData?.subject || "",
      hours: initialData ? Math.floor(initialData.duration / 60) : 0,
      minutes: initialData ? initialData.duration % 60 : 0,
      mood: initialData?.mood || "good",
      focusLevel: initialData?.focus || "3",
      details: initialData?.details || "",
    });
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    const payload = {
      subject: data.subject,
      duration: Number(data.hours) * 60 + Number(data.minutes),
      mood: data.mood,
      focus: Number(data.focusLevel),
      details: data.details,
    };
    onSubmit(payload);
  };

  return (
    <div className="w-full max-w-xl rounded-xl shadow-lg">
      <form
        className="bg-gray-50 p-12 rounded-xl space-y-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label>Subject</Label>

          <TextInput
            {...register("subject")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            placeholder="Entry subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        <Label htmlFor="duration">Duration</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Select
              {...register("hours", { valueAsNumber: true })}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            >
              <option value="0">0 hrs</option>
              <option value="1">1 hr</option>
              <option value="2">2 hrs</option>
              <option value="3">3 hrs</option>
            </Select>

            {errors.hours && (
              <p className="text-red-500 text-sm">{errors.hours.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Select
              {...register("minutes", { valueAsNumber: true })}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            >
              <option value="0">0 mins</option>
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
            </Select>

            {errors.minutes && (
              <p className="text-red-500 text-sm">{errors.minutes.message}</p>
            )}
          </div>
        </div>

        {/* MOOD STYLING */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="mood">Mood</Label>
            <Select
              {...register("mood")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <option>awful</option>
              <option>bad</option>
              <option>meh</option>
              <option>good</option>
              <option>amazing</option>
            </Select>
            {errors.mood && (
              <p className="text-red-500 text-sm">{errors.mood.message}</p>
            )}
          </div>

          {/* FOCUS STYLING  */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="focus-level">Focus level</Label>
            <Select
              {...register("focusLevel")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>

            {errors.focusLevel && (
              <p className="text-red-500 text-sm">
                {errors.focusLevel.message}
              </p>
            )}
          </div>
        </div>

        {/* DETAILS STYLING  */}
        <div className="flex flex-col gap-1">
          <Label>Details</Label>

          <Textarea {...register("details")} className="min-h-40" />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          Submit Entry
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
