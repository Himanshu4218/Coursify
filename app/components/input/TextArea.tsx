interface InputType {
  id: string;
  label: string;
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  value?: string;
  formik?: any;
  disabled?: boolean;
}

const TextArea: React.FC<InputType> = ({
  id,
  name,
  rows = 5,
  cols = 50,
  label,
  placeholder,
  value,
  formik,
  disabled
}) => {
  const fieldProps = formik ? formik.getFieldProps(name) : {};
  const isError = formik?.touched[name] && formik?.errors[name];
  const errorMessage = isError ? formik?.errors[name] : undefined;
  const inputValue = formik?.values[name] ?? value;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-md font-medium">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        {...fieldProps}
        value={inputValue}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        placeholder={placeholder}
        className="border-gray-200 outline-none border rounded-md mt-1 p-2 overflow-hidden w-full"
        disabled={disabled}
      />
      {errorMessage && typeof errorMessage === "string" && (
        <div className="text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default TextArea;
