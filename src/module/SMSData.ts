export interface SMSData {
  // Primary types
  _id: number;
  date: string;
  date_sent: string;

  address: string;
  body: string;

  // Calculated property
  fullBankName: string;
  date_display: string;
}
