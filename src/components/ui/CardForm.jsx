import React from "react";
import Card from "./Card";
import Button from "../ui/Button";

export default function CardForm({
  title,
  subtitle,
  icon,
  fields = [],
  onSubmit,
  submitLabel = "Simpan",
}) {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      icon={icon}
      footer={
        <div className="flex gap-3 justify-end">
          <Button onClick={onSubmit}>{submitLabel}</Button>
        </div>
      }
    >
      <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }} className="flex flex-col gap-4">
        {fields.map((f, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{f.label}</label>
            <input
              type={f.type || "text"}
              defaultValue={f.defaultValue || ""}
              placeholder={f.placeholder || ""}
              className="input-field"
            />
            {f.helper && <div className="text-xs text-gray-400 mt-1">{f.helper}</div>}
          </div>
        ))}
      </form>
    </Card>
  );
}
