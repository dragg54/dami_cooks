import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostSendPasswordReset } from "./api/PostSendPasswordReset";
import NotFoundPage from "../NotFoundPage";
import { PostResetPassword } from "./api/PostResetPassword";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
const userId = searchParams.get("userId")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const { mutate, isLoading, isSuccess, error, isPending, isError, reset } = PostResetPassword()   


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return reset();
        }

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        mutate({ token, newPassword: password });
    };

  if (!token || !userId) {
    return (
     <NotFoundPage />
    );
  }

  return (
    <div className="min-h-screen flex items-start mt-20 justify-center  px-4">
      <div className="w-full max-w-md bg-white  rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#d01110] mb-6 text-center">
          Reset Password
        </h2>

        {isSuccess && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700 text-sm">
            Password reset successful. Redirecting to login…
          </div>
        )}

        {isError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
            {"Invalid Request"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-primary py-2 text-white font-medium hover:bg-red-600 disabled:opacity-50"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
