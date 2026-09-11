export interface InsurancePolicy {
  provider: string;
  coverageTZS: number;
  deductibleTZS: number;
  claimsSupport: string;
}

export function getInsuranceCoverage(): InsurancePolicy {
  return {
    provider: 'AXA Tanzania',
    coverageTZS: 5_000_000,
    deductibleTZS: 0,
    claimsSupport: '24/7 claims desk + police abstract support'
  };
}

export function getClaimChecklist() {
  return [
    'Trip confirmation or booking reference',
    'Photo evidence of incident',
    'Police abstract (if applicable)',
    'Witness details or contact list',
    'Driver and vehicle information'
  ];
}
