import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Login Page</h1>
      <Link href="/form" className="ml-4 text-blue-500 hover:underline">
        Go to Form
      </Link>
      <Link href="/admin" className="ml-4 text-blue-500 hover:underline">
        Go to Admin
      </Link>
    </div>
  );
};

export default LoginPage;
