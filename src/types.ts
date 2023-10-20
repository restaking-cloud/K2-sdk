/// @notice Penalty type enumeration
export enum SlashType {
    Liveness,
    Corruption
};

/// @notice Standard Elliptic Curve ECDSA signature
export type SignatureECDSAT = {
    v: number; // version
    r: string; // x coordinate of the curve
    s: string; // y coordinate of the curve
};

/// @notice Structure representing the report
export type ReportT = {
    slashType: SlashType;
    debtor: string;     // Borrower address
    amount: number;     // Amount being slashed
    identifier: number; // Unique ID to avoid double reporting
    block: number;      // Block number
    signature: string;  // Blind signature being reported
};

export type LivenessReportT = {
    "rpbsSelfAttestation": RPBSSelfAttestationT;
    "eventType": string;
    "version": string;
    "eventData": EventDataT;
};

export type RPBSSelfAttestationT = {
    "signature": RPBSSelfAttestationSignatureT;
    "commonInfo": LivenessT;
    "publicKey": string;
};

export type RPBSSelfAttestationSignatureT = {
    "z1Hat": string;
    "c1Hat": string;
    "s1Hat": string;
    "c2Hat": string;
    "s2Hat": string;
    "m1Hat": string;
};

/// @notice Liveness report fetched from the Liveness API
export type LivenessT = {
    "numOfValidatorsOnline": string;
    "numOfValidatorsOffline": string;
    "totalValidators": string;
};

export type EventDataT = {
    "numOfValidatorsOnline": string,
    "numOfValidatorsOffline": string,
    "totalValidators": string,
    "proposedSlashing": string;   
};

export type MiddlewareInfoT = {
    "VERSION": string,
    "CHAIN_ID": string,
    "SERVICE_PROVIDER_BORROW_ADDRESS": string,
    "K_SQUARED_LENDING_CONTRACT": string,
    "K_SQUARED_REPORTER_REGISTRY": string,
    "LIVENESS_ENDPOINT": string,
    "REPORT_DEADLINE_LENGTH_IN_ETH_BLOCKS": string
};

export type LenderPositionT = {
    cumulativeKethPerShareLU_RAY: string;
    kethEarned: string;
}

export enum DebtPositionType {
    Slash
}

/// @dev Struct containing information on a particular debtor address
export type DebtPositionT = {
    debtor: string;
    designatedVerifier: string;
    principalAmount: string;
    interestPerSec_RAY: string;
    endTimestamp: string;
    slashAmount: string;
    maxSlashableAmountPerLiveness: string;
    maxSlashableAmountPerCorruption: string;
}
