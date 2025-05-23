export interface Donation {
    id: number;
    charity?: string;
    buyerUserId?: string;
    sellerUserId?: string;
    amount?: number;
}

export interface DonationDTO {
    buyerDonations?: Donation[];
    sellerDonations?: Donation[];
}