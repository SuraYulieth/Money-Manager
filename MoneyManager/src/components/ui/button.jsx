import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils" 

import PropTypes from 'prop-types';

const ButtonPropTypes = {
    variant: PropTypes.oneOf(["default", "destructive", "outline", "secondary", "ghost", "link"]),
    size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
    className: PropTypes.string,
    children: PropTypes.node,
};

const Button = forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50",
                    variant === "default" &&
                    "bg-blue-500 text-white hover:bg-blue-600",
                    variant === "destructive" &&
                    "bg-red-500 text-white hover:bg-red-600",
                    variant === "outline" &&
                    "border border-gray-300 text-gray-900 hover:bg-gray-100",
                    variant === "secondary" &&
                    "bg-gray-100 text-gray-900 hover:bg-gray-200",
                    variant === "ghost" &&
                    "text-gray-900 hover:bg-gray-100",
                    variant === "link" && "text-blue-500 hover:underline",
                    size === "sm" && "px-3 py-1.5",
                    size === "lg" && "px-6 py-3",
                    size === "icon" && "p-2",
                    className
                )}
                ref={ref}
                {...props}
            >
                {props.children}
            </button>
        );
    }
);

Button.propTypes = ButtonPropTypes;

export default Button;

