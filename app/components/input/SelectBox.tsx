import { FieldInputProps, FormikHandlers } from 'formik';
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { twMerge } from 'tailwind-merge';

interface SelectBoxProps {
    label: string;
    options: { value: string | number; label: string }[]; // Array of options
    mainClass?: string;
    selectClass?: string;
    id?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string | number;
    disabled?: boolean;
    isLoading?: boolean;
    name?: string;
    formik?: {
        getFieldProps: (nameOrOptions: string | FieldInputProps<any>) => FieldInputProps<any>;
        handleChange: FormikHandlers['handleChange'];
        errors?: { [key: string]: string };
        touched?: { [key: string]: boolean };
        values: any;
    };
}

const SelectBox: React.FC<SelectBoxProps> = ({
    label,
    options,
    mainClass = "",
    selectClass = "",
    id = "",
    isLoading = false,
    onChange,
    value = "",
    disabled = false,
    name = "",
    formik,
}) => {
    const fieldProps = formik?.getFieldProps ? formik.getFieldProps(name) : {};
    const isError = formik && formik.errors && formik.touched && formik.touched[name] && formik.errors[name];

    return (
        <div className={twMerge('w-full cursor-pointer', mainClass)}>
            <label
                htmlFor={id}
                className='text-md text-blackPrimary font-medium'
            >
                {label}
            </label>
            <div className='border-greySecondary border rounded-md bg-white mt-1 py-2 overflow-hidden w-full'>
                <select
                    id={id}
                    disabled={disabled}
                    onChange={(e) => {
                        if (onChange) onChange(e);
                        formik?.handleChange(e);
                    }}
                    value={formik?.values ? formik.values[name] : null}
                    {...fieldProps}
                    className={twMerge('outline-none py-[5.5px] w-full px-2', selectClass)}
                >
                    <option
                        value=""
                        disabled
                        className='w-full'>
                        Select an option
                    </option>
                    {isLoading ? (
                        <option disabled>
                            <span className="ml-1 text-primary">
                                Loading....
                            </span>
                        </option>
                    ) : (
                        options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    )}
                </select>
            </div>
            {
                formik &&
                formik.errors &&
                formik.touched &&
                formik.touched[name] &&
                formik.errors[name] &&
                (
                    <div className="text-red-500 font-medium error">{formik.errors[name]}</div>
                )
            }
        </div>
    );
};

export default SelectBox;
