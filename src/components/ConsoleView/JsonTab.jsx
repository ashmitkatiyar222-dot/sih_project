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
      <div
        className="flex justify-between items-center mb-1 text-xs font-sans"
        style={{ color: 'var(--text-muted, #73766f)' }}
      >
        <span>Raw Project Data & Safety Coordinates (JSON):</span>
        <button
          onClick={handleCopy}
          className="font-bold inline-flex items-center gap-1 cursor-pointer hover:underline"
          style={{ color: 'var(--color-primary, #315c48)' }}
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
      <pre
        className="p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border shadow-inner"
        style={{
          backgroundColor: 'var(--dark-surface, #222a25)',
          color: '#d1ead7',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        <code>{jsonString}</code>
      </pre>
    </div>
  );
}
