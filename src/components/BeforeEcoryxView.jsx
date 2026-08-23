import React from 'react';
import { AlertTriangle, Clock, MapPin, DollarSign, ArrowRight, XCircle, FileSpreadsheet, ShieldAlert, Ban } from 'lucide-react';

const AUDIT_DISCREPANCIES = [
  {
    parameter: 'Sanctuary & Forest Buffer Measurement',
    manualProcess: 'Hand-drawn radial circles on physical topographic survey sheets',
    delay: '6 to 10 weeks',
    risk: 'High risk of boundary overlap penalty (WPA 1972 violation)',
  },
  {
    parameter: 'Statutory Gazette Cross-Referencing',
    manualProcess: 'Lawyers manually thumbing through 2,400+ un-indexed state gazette PDFs',
    delay: '4 to 8 weeks',
    risk: 'Overlooked local wildlife corridor notifications & NGT court stays',
  },
  {
    parameter: 'Air & Water Dispersion Modeling',
    manualProcess: 'Hiring external consultants for third-party plume test reports',
    delay: '8 to 14 weeks',
    risk: '₹35-50 Lakhs in repetitive consultant fees per project',
  },
  {
    parameter: 'Committee Clearance Drafting',
    manualProcess: 'Stenographers manually typing and mailing physical paperwork',
    delay: '4 to 6 months',
    risk: 'Severe capital blockage and infrastructure commissioning delays',
  },
];

const HISTORIC_CASE_STUDIES = [
  {
    title: 'Aravalli Quartzite Quarry Corridor',
    location: 'Rajasthan · 4.2 km from Sariska ESZ',
    manualOutcome: '7 Month Approval Delay · ₹42L Consultant Fees · Stayed by NGT due to buffer discrepancy',
    ecoryxVerdict: 'Instant 0.38s Conditional Flagging with automated Wildlife Board clearance checklist',
  },
  {
    title: 'Western Ghats Hydroelectric Penstock',
    location: 'Kerala/Karnataka · 2.1 km from Wayanad Tiger Reserve',
    manualOutcome: '11 Month Submergence Review · Incomplete elephant corridor mapping',
    ecoryxVerdict: 'Instant 0.38s Critical Review Verdict & Schedule-I Species Migration Protocol generated',
  },
  {
    title: 'NCR Yamuna Chemical Park Expansion',
    location: 'Uttar Pradesh · 1.4 km from River Basin',
    manualOutcome: '5 Month Stoppage · GRAP Airshed Non-Attainment violation penalty',
    ecoryxVerdict: 'Instant 0.38s Zero Liquid Discharge (ZLD) Mandate & Air Filter EMP attached',
  },
];

export default function BeforeEcoryxView({ isActive, onSwitchToAfter }) {
  return (
    <div className={`view-panel view-panel-before ${isActive ? 'panel-active' : 'panel-hidden'}`}>
      <div
        className="rounded-xl p-5 sm:p-7 relative border shadow-xs space-y-5"
        style={{
          backgroundColor: 'var(--bg-card, #fbfaf6)',
          borderColor: 'var(--border-subtle, #d8d4ca)',
        }}
      >
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-3" style={{ borderColor: 'var(--border-subtle, #d8d4ca)' }}>
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold mb-1"
              style={{
                backgroundColor: 'var(--color-red-light, #faebe9)',
                color: 'var(--color-red, #a54d42)',
              }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TRADITIONAL MANUAL WORKFLOW LEDGER</span>
            </div>
            <h3
              className="text-lg sm:text-xl font-serif font-bold tracking-tight"
              style={{ color: 'var(--text-main, #20231f)' }}
            >
              Manual Paper Screening Friction &amp; Audit Discrepancies
            </h3>
          </div>

          <button
            onClick={onSwitchToAfter}
            className="px-3.5 py-1.5 rounded-lg text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 shadow-xs shrink-0 self-start sm:self-center"
            style={{ backgroundColor: 'var(--color-primary, #315c48)' }}
          >
            <span>Turn Dial to Ecoryx AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Structured Ledger Table */}
        <div
          className="overflow-x-auto rounded-lg border"
          style={{
            borderColor: 'var(--border-subtle, #d8d4ca)',
            backgroundColor: 'var(--bg-card, #fbfaf6)',
          }}
        >
          <table className="w-full text-left text-xs font-sans">
            <thead
              className="border-b font-mono text-[11px]"
              style={{
                backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--text-main, #20231f)',
              }}
            >
              <tr>
                <th className="p-3">Clearance Stage</th>
                <th className="p-3">Traditional Manual Method</th>
                <th className="p-3">Typical Delay</th>
                <th className="p-3">Financial / Legal Exposure</th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{
                borderColor: 'var(--border-subtle, #d8d4ca)',
                color: 'var(--text-muted, #73766f)',
              }}
            >
              {AUDIT_DISCREPANCIES.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-[#edeae1]/40"
                  style={{ backgroundColor: 'var(--bg-card, #fbfaf6)' }}
                >
                  <td className="p-3 font-semibold" style={{ color: 'var(--text-main, #20231f)' }}>
                    {row.parameter}
                  </td>
                  <td className="p-3">{row.manualProcess}</td>
                  <td className="p-3 font-mono font-bold" style={{ color: 'var(--color-secondary, #b77927)' }}>
                    {row.delay}
                  </td>
                  <td className="p-3 text-[11px]" style={{ color: 'var(--color-red, #a54d42)' }}>
                    {row.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Historic Case Studies Comparison */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted, #73766f)' }}>
            State-Level Audit Impact Comparison (Real Benchmark Scenarios):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {HISTORIC_CASE_STUDIES.map((cs, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card-subtle, #edeae1)',
                  borderColor: 'var(--border-subtle, #d8d4ca)',
                }}
              >
                <div>
                  <div className="font-serif font-bold text-xs" style={{ color: 'var(--text-main, #20231f)' }}>
                    {cs.title}
                  </div>
                  <div className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
                    {cs.location}
                  </div>
                  <div className="mt-2 text-[11px] p-1.5 rounded border" style={{ backgroundColor: 'var(--color-red-light, #faebe9)', color: 'var(--color-red, #a54d42)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                    <strong>Manual:</strong> {cs.manualOutcome}
                  </div>
                </div>
                <div className="mt-2 text-[11px] p-1.5 rounded border" style={{ backgroundColor: 'var(--color-primary-light, #e2ebe5)', color: 'var(--color-primary-text, #244737)', borderColor: 'var(--border-subtle, #d8d4ca)' }}>
                  <strong>Ecoryx:</strong> {cs.ecoryxVerdict}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Key Metric Summary */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x rounded-lg border p-3"
          style={{
            backgroundColor: 'var(--bg-card-subtle, #edeae1)',
            borderColor: 'var(--border-subtle, #d8d4ca)',
          }}
        >
          <div className="p-2 sm:px-3 text-left">
            <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>
              Average Clearance Time Lost
            </div>
            <div className="text-xl font-mono font-bold mt-0.5" style={{ color: 'var(--color-red, #a54d42)' }}>
              4 to 6 Months
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
              Per major civil or highway infrastructure corridor
            </p>
          </div>

          <div className="p-2 sm:px-3 text-left">
            <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>
              Consultant Expense Leak
            </div>
            <div className="text-xl font-mono font-bold mt-0.5" style={{ color: 'var(--color-secondary, #b77927)' }}>
              ₹45 Lakhs+
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
              Wasted on routine distance and zoning certifications
            </p>
          </div>

          <div className="p-2 sm:px-3 text-left">
            <div className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted, #73766f)' }}>
              Survey Measurement Error
            </div>
            <div className="text-xl font-mono font-bold mt-0.5" style={{ color: 'var(--color-red, #a54d42)' }}>
              55% Discrepancy
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted, #73766f)' }}>
              Between physical sketches and actual satellite ESZ borders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
