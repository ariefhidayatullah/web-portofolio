"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import SwipeToast from "@/components/ui/SwipeToast";

// Shows a themed toast for each new `trigger` (a fresh action-state object per
// successful submit) until the visitor dismisses it or the fuse runs out.
export default function SuccessToast({ trigger, title }: { trigger: object | null; title: string }) {
  const [closed, setClosed] = useState<object | null>(null);
  if (!trigger || trigger === closed) return null;
  return (
    <SwipeToast
      title={title}
      icon={<CheckCircle2 className="text-emerald-400" />}
      background="#111a2e"
      color="#f0f0ff"
      fuseColor="#60a5fa"
      closeButton
      onClose={() => setClosed(trigger)}
      className="font-sans"
    />
  );
}
