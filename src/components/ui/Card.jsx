import React from "react";

/**
 * Card component
 * Props:
 * - title: string
 * - subtitle: string
 * - icon: node (img src or element)
 * - children: content (form fields or body)
 * - footer: node (actions)
 * - className: extra classes
 */
const Card = ({ title, subtitle, icon, children, footer, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
            {typeof icon === "string" ? (
              <img src={icon} alt="icon" className="w-8 h-8" />
            ) : (
              icon
            )}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-[#0f172a]">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-4">{children}</div>

      {footer && <div className="mt-6 border-t pt-4">{footer}</div>}
    </div>
  );
};

export default Card;
