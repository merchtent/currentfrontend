export interface Subscriber {
    email?: string;  // Optional because in C#, it's a nullable string (string?)
    timestamp: Date; // In TypeScript, Date objects are used for DateTime
    type?: string
}
