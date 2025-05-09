
    import React from 'react';
    import { cn } from "@/lib/utils" //If you are using classnames

    import PropTypes from 'prop-types';

    const ButtonPropTypes = {
        variant: PropTypes.oneOf(['default', 'special']), // Add custom variants
        className: PropTypes.string,
        children: PropTypes.node,
    };

    const Button = ({
        children,
        variant = 'default',
        className,
        ...props
    }) => {
        let baseClasses = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"; //basic classes

        const variantClasses = {
            default: "bg-blue-500 text-white hover:bg-blue-600",
            special: "bg-green-500 text-white hover:bg-green-600 border border-green-700", // Example
        };

        const combinedClasses = cn(
            baseClasses,
            variantClasses[variant] || variantClasses.default, // Default to 'default' if variant is invalid
            className // Allow additional classes
        );

        return (
            <button className={combinedClasses} {...props}>
                {children}
            </button>
        );
    };

    Button.propTypes = ButtonPropTypes;


    export default Button;