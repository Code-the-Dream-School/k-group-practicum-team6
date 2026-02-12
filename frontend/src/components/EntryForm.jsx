import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { entrySchema } from "../components/EntryFormValidation/entrySchema";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";

const EntryForm = ({ initialData, persistEntry, onClose }) => {
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
      mood: initialData?.mood || "Okay",
      focusLevel: initialData?.focus || "3",
      details: initialData?.details || "",
    });
  }, [initialData, reset]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback(
    (data) => {
      const payload = {
        subject: data.subject,
        duration: Number(data.hours) * 60 + Number(data.minutes),
        mood: data.mood,
        focus: Number(data.focusLevel),
        details: data.details,
      };
      const submitEntry = async () => {
        setIsLoading(true);
        try {
          await persistEntry(payload);
          onClose();
        } catch (err) {
          console.log("error while saving:", err);
        } finally {
          setIsLoading(false);
        }
      };
      submitEntry();
    },
    [persistEntry, onClose],
  );

  return (
    <div className="w-full max-w-xl rounded-xl">
      <form
        className="p-12 rounded-xl space-y-4"
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

            {/* {errors.hours && (
              <p className="text-red-500 text-sm">{errors.hours.message}</p>
            )} */}
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

            {/* {errors.minutes && (
              <p className="text-red-500 text-sm">{errors.minutes.message}</p>
            )} */}
          </div>
        </div>
        {/*Error messages*/}
        {errors.hours?.message ||
        errors.minutes?.message ||
        errors.root?.message ? (
          <p className="text-red-500 text-sm">
            {errors.hours?.message ||
              errors.minutes?.message ||
              errors.root?.message}
          </p>
        ) : null}

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
              <option value="Awful">Awful</option>
              <option value="Not Great">Not Great</option>
              <option value="Okay">Okay</option>
              <option value="Great">Great</option>
              <option value="Amazing">Amazing</option>
            </Select>
            {errors.mood && (
              <p className="text-red-500 text-sm">{errors.mood.message}</p>
            )}
          </div>

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

        <div className="flex flex-col gap-1">
          <Label>Details</Label>

          <Textarea {...register("details")} className="min-h-40" />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-medium
bg-primary-600/15 text-primary-900 border border-primary-600/35
hover:bg-primary-600/20 hover:border-primary-600/45
transition-colors duration-200
focus:outline-none focus:ring-2 focus:ring-primary-500/35
dark:bg-primary-400/20 dark:text-primary-200 dark:border-primary-300/25
dark:hover:bg-primary-300/15 dark:hover:border-primary-200/35 cursor-pointer${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-cyan-800"
          }`}
        >
          Submit Entry
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
