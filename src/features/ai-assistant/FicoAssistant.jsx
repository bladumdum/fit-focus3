import React from "react";
import StreamedAssistant from "./StreamedAssistant";

export default function FicoAssistant() {
  return (
    <div className="h-full" style={{ minHeight: "calc(100vh - 4rem)" }}>
      <StreamedAssistant />
    </div>
  );
}
