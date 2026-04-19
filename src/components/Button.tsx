import React, { useState } from "react";
import { COLORS } from "./Theme";

type Variant = "primary" | "secondary" | "danger" | "success" | "cancel" | "none";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
    variant?: Variant;
    size?: Size;
    confirmMessage?: string;
    loading?: boolean;
    onAction?: () => void;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const baseStyles =
    "inline-flex items-center justify-center rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
    primary: `${COLORS.primary} text-white hover:${COLORS.hoverPrimary} focus:ring-blue-500`,
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    cancel: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
    none: "bg-transparent"
};

const sizeStyles: Record<Size, string> = {
    sm: "p-2 text-sm",
    md: "p-4 text-base",
    lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
                                           variant = "primary",
                                           size = "md",
                                           confirmMessage,
                                           loading = false,
                                           onAction,
                                           icon,
                                           iconPosition = "left",
                                           className = "",
                                           children,
                                           disabled,
                                           ...props
                                       }) => {
    const [internalLoading, setInternalLoading] = useState(false);

    const handleClick = async () => {
        if (disabled || loading || internalLoading) return;

        if (confirmMessage) {
            const confirmed = window.confirm(confirmMessage);
            if (!confirmed) return;
        }

        if (onAction) {
            try {
                setInternalLoading(true);
                await onAction();
            } finally {
                setInternalLoading(false);
            }
        }
    };

    const isLoading = loading || internalLoading;

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
          <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
          >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
            ></path>
          </svg>
          Loading...
        </span>
            ) : (
                <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && <span>{icon}</span>}
                    <span>{children}</span>
                    {icon && iconPosition === "right" && <span>{icon}</span>}
        </span>
            )}
        </button>
    );
};

export default Button;
