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
    <div className="relative space-y-1.5">
      <div
        className="flex justify-between items-center text-[11px] font-mono"
        style={{ color: 'var(--text-muted, #5e625a)' }}
      >
        <span>Statutory Payload GeoJSON:</span>
        <button
          onClick={handleCopy}
          className="font-semibold inline-flex items-center gap-1 cursor-pointer hover:opacity-80"
          style={{ color: 'var(--color-primary, #284e3a)' }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Payload</span>
            </>
          )}
        </button>
      </div>
      <pre
        className="p-3 rounded text-[10px] font-mono overflow-x-auto max-h-48 leading-relaxed border shadow-xs"
        style={{
          backgroundColor: 'var(--dark-surface, #1c231f)',
          color: '#d1ead7',
          borderColor: 'var(--border-subtle, #d5cfc2)',
        }}
      >
        <code>{jsonString}</code>
      </pre>
    </div>
  );
}
