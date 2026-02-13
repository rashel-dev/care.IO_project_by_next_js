import RegisterForm from "@/components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[#0a0a0a]">
      {/* Form Container */}
      <div className="z-10 w-full flex justify-center py-12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;