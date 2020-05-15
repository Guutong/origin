import { IOwnershipCommitmentProofWithTx } from './OwnershipCommitment';

export enum CommitmentStatus {
    CURRENT,
    PENDING,
    REJECTED
}

export interface OwnershipCommitmentStatus {
    proof: IOwnershipCommitmentProofWithTx,
    status: CommitmentStatus
}

export interface ICertificateOwnership {
    id: number;
    currentOwnershipCommitment: IOwnershipCommitmentProofWithTx;
    pendingOwnershipCommitment: IOwnershipCommitmentProofWithTx;
    ownershipHistory: IOwnershipCommitmentProofWithTx[];
}
