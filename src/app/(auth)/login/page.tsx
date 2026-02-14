import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
      {/* Form Container */}
      <div className="z-10 w-full flex justify-center py-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
