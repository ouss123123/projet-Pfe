import React from 'react';

const Button = ({ 
    children, 
    className = '', 
    variant = 'primary',
    disabled = false,
    ...props 
}) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg",
      outline:"border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 