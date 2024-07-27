"use client";

import { useFormState } from "react-dom";
import Button from "../../../components/Button";
import { createUser } from "../../../actions/api";

const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#283950aa] z-40 flex justify-center items-center">
      <form className="space-y-3" action={formAction}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-2xl`}>Sign Up</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className=" block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Enter your Username"
                  required
                  minLength={4}
                  maxLength={16}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className=" block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className=" block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button>Register</Button>
          </div>

          <div className="flex h-8 items-end space-x-1">
            {state.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
