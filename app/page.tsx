"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const router = useRouter();

  const onSubmit = () => {
    if (isValid) {
      router.push("/admin");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="relative bg-blue-200 hidden lg:block" />
      <div className="flex items-center justify-center">
        <div className="w-[70%]">
          <h1 className="text-4xl font-bold">Staff Login</h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="email"
              label="Email address"
              type="email"
              required
            />
            <Input
              register={register}
              name="password"
              label="Password"
              type="password"
              required
            />
            <Button variant="solid" type="submit" className="w-full">
              Sign In
            </Button>

            <div className="mt-10 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl p-6">
              <h1 className="text-lg font-bold">New Patient?</h1>
              <p className="text-sm text-[#475569] mb-4">
                Complete your digital intake form before your appointment to
                save time.
              </p>
              <Link href="/form">
                <Button variant="outline" className="w-full">
                  Fill Patient Form
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
