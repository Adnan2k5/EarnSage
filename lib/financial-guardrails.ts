export const FINANCIAL_GUARDRAILS = {
  targetLossRatio: 0.65,           // payouts / premiums
  alertLossRatio: 0.75,            // Slack alert to ops
  suspendLossRatio: 0.90,          // auto-pause new sign-ups for city
  maxWeeklyPayoutPerUser: 2100,    // Standard Shield cap
  annualAggCap: 2100 * 12,         // 12× weekly max = ₹25,200/year
  waitingPeriodDays: 7,            // no payout in first 7 days
  minTriggerDurationMins: 30,      // rainfall must sustain ≥30min
  reinsuranceThreshold: 400000,    // ₹4L in a single week triggers reinsurance
  maxPremiumIncrease: 0.20,        // 20% cap on price increase per renewal
};
