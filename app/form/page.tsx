"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../../config/pusher";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import RadioGroup from "../../components/ui/RadioGroup";
import Select from "../../components/ui/Select";
import { NATIONALITIES } from "../../constant/nationality.constant";
import { ArrowRightIcon } from "@/components/Icon";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

const FormPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const router = useRouter();
  const allFields = watch();
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    try {
      await fetch("/api/submit-form", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          status: "submit",
        }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="md:hidden bg-white shadow-sm min-h-15 p-5 xl:px-10 flex items-center justify-between">
        <Link href="/">
          <ArrowRightIcon className="mr-2 rotate-180 w-10 h-10" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="">
          <p className="md:text-center text-[30px] font-bold">
            Personal Details
          </p>
          <p className="md:text-center my-1">
            Please provide your legal identification information.
          </p>
        </div>

        <div className="md:bg-white md:shadow-lg rounded-xl mt-10 md:p-6 w-full">
          <div>
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
              <div className="flex gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent", { required: true })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 "
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I consent to the processing of my personal data in accordance
                  with the privacy policy.
                </label>
              </div>
              <div className="flex justify-between">
                <Link href="/">
                  <Button variant="default" className="w-fit" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button className="w-fit" type="submit" disabled={!isValid}>
                  Continue
                  <ArrowRightIcon className="ml-1" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push("/");
        }}
        title={"Submission Successful!"}
        description={
          <span>
            Thank you for providing your information. Your data has been
            securely received by the
            <span className="font-semibold text-blue-600"> HealthTrack </span>
            team.
          </span>
        }
      />
    </div>
  );
};

export default FormPage;
