import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

import PropTypes from 'prop-types';

const Label = React.forwardRef(
    ({ className, children, htmlFor, ...props }, ref) => {
        return (
            <label
                ref={ref}
                htmlFor={htmlFor}
                className={cn(
                    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                    className
                )}
                {...props}
            >
                {children}
            </label>
        );
    }
);
Label.displayName = 'Label';

Label.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    htmlFor: PropTypes.string,
};

export { Label };

