import { FormikProps } from "formik";
import { ForwardedRef, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  ref?: ForwardedRef<HTMLInputElement>;
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  mainClass?: string;
  inputClass?: string;
  togglePassword?: () => void;
  showPassword?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  formik?: FormikProps<any>;
  disabled?: boolean;
}

const Input = forwardRef(
  (
    {
      id,
      type = "text",
      name,
      label,
      placeholder,
      value,
      mainClass = "",
      inputClass = "",
      togglePassword,
      showPassword,
      onKeyDown,
      formik,
      disabled = false,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const fieldProps = formik ? formik.getFieldProps(name) : {};
    const isError = formik?.touched[name] && formik?.errors[name];
    const errorMessage = isError ? formik?.errors[name] : undefined;
    const inputValue = formik?.values[name] ?? value;

    return (
      <div className={twMerge("w-full relative", mainClass)}>
        <label
          htmlFor={id}
          className="text-[16px] text-primaryBlack font-medium"
        >
          {label}
        </label>
        <div className="relative border-gray-200 border rounded-md bg-white mt-1 p-2 overflow-hidden w-full">
          <input
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...fieldProps}
            value={inputValue}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            onKeyDown={onKeyDown}
            className={twMerge("outline-none py-1 w-full", inputClass)}
            disabled={disabled}
          />
          {togglePassword && (
            <span
              onClick={togglePassword}
              className="absolute right-2 top-[15px] cursor-pointer"
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </span>
          )}
        </div>
        {errorMessage && typeof errorMessage === "string" && (
          <div className="text-red-600">{errorMessage}</div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
