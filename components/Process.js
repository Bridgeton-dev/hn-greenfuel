"use client";
import ProcessTimeline from "./ProcessTimeline";
import { STEPS } from "../lib/data";

export default function Process() {
  return (
    <ProcessTimeline
      id="process"
      steps={STEPS}
      eyebrow="The process"
      heading={
        <>
          From field waste to <span className="ember-t">white coal</span>.
        </>
      }
      showCta
    />
  );
}
