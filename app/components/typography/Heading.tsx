import { twMerge } from "tailwind-merge";

interface HeadingProps {
    label: string;
    className?: string;
    level?: 1 | 2;
}

const Heading: React.FC<HeadingProps> = ({
    label = "",
    className = "",
    level = 1,
}) => {
    const baseClass = "font-semibold";
    let levelClass;

    switch (level) {
        case 1:
            levelClass = "text-lg";
            break;
        case 2:
            levelClass = "text-4xl";
            break;
        default:
            levelClass = "text-lg";
    }

    return (
        <h2 className={twMerge(`${levelClass} font-semibold`, className)}>
            {label}
        </h2>
    );
};

export default Heading;
