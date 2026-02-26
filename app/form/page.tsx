"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../config/pusher";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import RadioGroup from "../../components/ui/RadioGroup";
import Select from "../../components/ui/Select";
import { NATIONALITIES } from "../../constant/nationality.constant";

const FormPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const allFields = watch();
  const [userId, setUserId] = useState("");

  // subscribe to channel and get userId to form
  useEffect(() => {
    const channel = pusherClient.subscribe("presence-channel");

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      setUserId(members.me.id);
      console.log("Subscribed to presence-channel with members:", members);
    });

    return () => {
      pusherClient.unsubscribe("presence-channel");
    };
  }, []);

  // sync form data real-time
  useEffect(() => {
    const syncData = async () => {
      await fetch("/api/pusher/typing", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          formData: allFields,
        }),
      });
    };

    const timeout = setTimeout(syncData, 3000);
    return () => clearTimeout(timeout);
  }, [allFields, userId]);

  // submit form
  const handleFormSubmit = async () => {
    await fetch("/api/submit-form", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
        status: "submit",
      }),
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-4xl">
        <p className="md:text-center text-[30px] font-bold">Personal Details</p>
        <p className="md:text-center my-1">
          Please provide your legal identification information.
        </p>

        <div className="md:bg-white md:shadow-lg rounded-xl mt-10 p-5 w-full">
          <div className="md:p-5">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-3 gap-5">
                <Input
                  register={register}
                  label="First Name"
                  name="firstName"
                  placeholder="e.g. Anton"
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500">
                    {String(errors.firstName.message)}
                  </span>
                )}
                <Input
                  register={register}
                  label="Middle Name"
                  name="middleName"
                  placeholder="Optional"
                  required={false}
                />
                <Input
                  register={register}
                  label="Last Name"
                  name="lastName"
                  placeholder="e.g. Lee"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  register={register}
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                />
                <RadioGroup
                  register={register}
                  label="Gender"
                  name="gender"
                  required={true}
                />
              </div>
              <Input
                register={register}
                label="Emergency Contact"
                name="emergencyContact"
                placeholder="Enter emergency contact details"
              />
              <div className="grid md:grid-cols-2 gap-5">
                <Select
                  register={register}
                  label="Nationality"
                  name="nationality"
                  required={true}
                  options={NATIONALITIES}
                />
                <Input
                  register={register}
                  label="Religion (optional)"
                  name="religion"
                  required={false}
                  placeholder="Enter religion if applicable"
                />
              </div>
              <div className="flex gap-4 items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent", { required: true })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I consent to the processing of my personal data in accordance
                  with the privacy policy.
                </label>
              </div>
              <div className="flex justify-end">
                <Button className="w-fit" type="submit" disabled={!isValid}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
