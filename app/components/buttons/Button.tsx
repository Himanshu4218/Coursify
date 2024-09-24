import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    label: string;
    type?: "submit" | "reset" | "button";
    textClass?: string;
    variant?:
    | "basic"
    | "basicTransparent"
    | "simpleTransparent"
    | "greyTransparent"
    | "blackBasic"
    | "pillBasic";
    icon?: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
}

interface ButtonVariant {
    buttonClasses: string;
    labelClasses: string;
    iconClasses: string;
}

const buttonVariants: Record<string, ButtonVariant> = {
    basic: {
        buttonClasses:
            "text-white bg-primary font-semibold rounded-md hover:bg-transparent hover:text-primary outline-none hover:outline-primary",
        labelClasses: "text-base ",
        iconClasses: "text-white",
    },
    basicTransparent: {
        buttonClasses:
            "text-primary bg-primaryDim border border-primary group hover:bg-primary  transition-all",
        labelClasses: "text-base font-sembild group-hover:text-white",
        iconClasses: "text-primary font-semibold group-hover:text-white",
    },
    simpleTransparent: {
        buttonClasses:
            "border border-greyMedium bg-white rounded-md hover:bg-gray-100",
        labelClasses: "text-black text-sm font-semibold",
        iconClasses: "text-greyMedium font-semibold",
    },
    greyTransparent: {
        buttonClasses:
            "border border-greyMedium bg-white rounded-md hover:bg-gray-100",
        labelClasses: "text-greySecondary text-sm font-semibold",
        iconClasses: "text-greySecondary font-semibold",
    },
    blackBasic: {
        buttonClasses:
            "text-white bg-black font-semibold rounded-md hover:bg-transparent hover:text-black outline-none hover:outline-black",
        labelClasses: "text-base",
        iconClasses: "text-white",
    },
    pillBasic: {
        buttonClasses:
            "border border-primary bg-primary rounded-3xl w-fit hover:bg-white",
        labelClasses:
            "text-white text-sm font-normal tracking-wide group-hover:text-black group-hover:font-medium",
        iconClasses: "font-semibold group-hover:text-black",
    },
};

const Button = ({
    label,
    type = "submit",
    textClass = "",
    variant = "basic",
    icon,
    onClick,
    disabled = false,
    className = "",
    isLoading = false,
}: ButtonProps) => {
    const variantClasses: ButtonVariant = buttonVariants[variant] || {
        buttonClasses: "",
        labelClasses: "",
        iconClasses: "",
    };
    return (
        <button
            type={type}
            className={twMerge(
                `rounded-md group bg-transparent group transition-all duration-300 flex items-center justify-center gap-1 p-3 px-5 w-full disabled:opacity-65 disabled:cursor-not-allowed disabled:pointer-events-none`,
                variantClasses.buttonClasses,
                className
            )}
            onClick={onClick}
            disabled={isLoading || disabled}
        >
            {icon && <span className={variantClasses.iconClasses}>{icon}</span>}

            {isLoading ? (
                <>
                    <span className={variantClasses.labelClasses}>Processing...</span>
                    <span className="animate-spin ml-1">
                        <ImSpinner2 />
                    </span>
                </>
            ) : (
                <span
                    className={twMerge(
                        variantClasses.labelClasses,
                        "sm:block",
                        textClass
                    )}
                >
                    {label}
                </span>
            )}
        </button>
    );
};

export default Button;
