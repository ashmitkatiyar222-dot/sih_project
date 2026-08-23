import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function JsonTab({ lat, lng, footprint, buffer, category, results }) {
  const [copied, setCopied] = useState(false);

  const jsonSchema = {
    ecoryx_version: "2.4.1",
    audit_timestamp: new Date().toISOString(),
    project_metadata: {
      center_coordinates: { lat, lng },
      footprint_hectares: footprint,
      radial_buffer_km: buffer,
      industry_category: category,
      statutory_rulebook: "moefcc_2006_amended"
    },
    compliance_verdict: {
      status: results.verdict.includes("CONDITIONAL")
        ? "CONDITIONAL_CLEARANCE"
        : results.verdict.includes("CRITICAL")
        ? "CRITICAL_REVIEW"
        : "APPROVED",
      composite_risk_score: results.riskScore
    }
  };

  const jsonString = JSON.stringify(jsonSchema, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1 text-xs font-sans text-stone-500 dark:text-stone-500">
        <span>Raw Project Data & Safety Coordinates (JSON):</span>
        <button
          onClick={handleCopy}
          className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Data</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-[#0B0F19] dark:bg-[#060A10] text-emerald-300 dark:text-emerald-400 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border border-stone-800 dark:border-slate-800 shadow-inner">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
}




