



import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { entrySchema } from "../components/EntryFormValidation/entrySchema";  



const EntryForm = ({initialData, onSubmit, onCancel}) => { 

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(entrySchema),
    defaultValues: {
      subject: initialData?.subject || "",
      hours: initialData?.hours || 0,
      minutes: initialData?.minutes || 0,
      mood: initialData?.mood || "",
      focusLevel: initialData?.focusLevel || "",
      details: initialData?.details || "",
    },
  });

  const [isDurationOpen, setIsDurationOpen] = useState(false);
  




const handleFormSubmit = (data) => {

    onSubmit(data);
}

    let durationContent;

    if (isDurationOpen) {
      durationContent = (
        <div className="input-style flex gap-2 items-center bg-white text-black ">
          <select {...register("hours", { valueAsNumber: true })}
            className="input-style"
          >
            <option value="0">0 hrs</option>
            <option value="1">1 hr</option>
            <option value="2">2 hrs</option>
            <option value="3">3 hrs</option>
          </select>

          <select {...register("minutes", { valueAsNumber: true })}
            className="input-style"
          >
            <option value="0">0 mins</option>
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
            <option value="45">45 mins</option>
          </select>
        </div>
      )
    } else {
      durationContent = (
        <div
           onClick={() => setIsDurationOpen(true)}
           className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-pointer"
        >
          Select duration
        </div>

      )
    }

    const getSelectTextColor = (value) => {
      if (value === "") {
        return "text-gray-400";
      }
      return "text-gray-900";
    };


    return (
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl relative">
      
          <form className="relative bg-gray-50 p-6 rounded-xl space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>



            {/* <div className="flex flex-col gap-1">
              <label className="text-md text-gray-700 font-medium">
                Date
              </label>
              <input 
                type="text" 
                placeholder="YYYY-MM-DD"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white
                            border border-gray-200
                            rounded-lg
                            px-3 py-2
                            text-sm
                            text-gray-900
                            placeholder-gray-400
                            focus:ring-2 focus:ring-blue-400"
              />
  
            </div> */}

            <div className="flex flex-col gap-1">
              <label className="text-md text-gray-700 font-medium">
                Subject
              </label>

              <input
              // type="text"
              // placeholder="Entry subject"
              // value={subject}
              // onChange={(e) => setSubject(e.target.value)}
              // className="text-sm 
              //         text-gray-900 input-style 
              //         placeholder:text-gray-400
              //         bg-white
              //         border border-gray-300 
              //         rounded-lg px-4 py-2 
              //         shadow-sm hover:shadow-md 
              //         focus:outline-none focus:ring-2 
              //         focus:ring-blue-400"
              {...register("subject")}
              onKeyDown={(e) => {
                 if (e.key === "Enter") {
                 e.preventDefault();
                 }
              }}
              className="input-style"
              placeholder="Entry subject"
              />
              {errors.subject && 
              (<p className="text-red-500 text-sm">{errors.subject.message}</p>)}
            </div>


            <div className="flex flex-col gap-1">
              <label className="text-md text-gray-700 font-medium">
                Duration
              </label>
              {durationContent}

              {errors.hours && (
                <p className="text-red-500 text-sm">
                {errors.hours.message}
                </p>
             )}
            </div>




            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-1">
                  <label className="text-md text-gray-700 font-medium">
                     Mood
                  </label>
                  <select
                   {...register("mood")}
                   onKeyDown={(e) => {
                      if (e.key === "Enter") {
                      e.preventDefault();
                      }
                    }}
                   className={`input-style ${getSelectTextColor("")}`}
                  >
                    <option value="">Mood</option>
                    <option value="awful">awful</option>
                    <option value="bad">bad</option>
                    <option value="meh">meh</option>
                    <option value="good">good</option>
                    <option value="amazing">amazing</option> .
                  </select>
                  {errors.mood && (
                    <p className="text-red-500 text-sm">{errors.mood.message}</p>
                  )}

               </div>

               <div className="flex flex-col gap-1">
                  <label className="text-md text-gray-700 font-medium">
                     Focus level
                  </label>
                  <select {...register("focusLevel")} 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    e.preventDefault();
                   }
                  }}
                  className="input-style">
                     <option value="" text-gray-400>Focus Level</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  {errors.focusLevel && (
                    <p className="text-red-500 text-sm">{errors.focusLevel.message}</p>
                  )}
                </div>
            </div>


            <div className="flex flex-col gap-1">
              <label className="text-md text-gray-700 font-medium">
                Details
              </label>

              <textarea
                {...register("details")}
                className="input-style min-h-32 resize-y"
              />
             </div>


            


            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Entry
            </button>

          </form>
    </div>

      
    )
}

export default EntryForm;