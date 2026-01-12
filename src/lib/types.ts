export type Client = {
  id: string;
  clientName: string;
  companyName: string;
  city: string;
  contactPerson: string;
  phone: string;
  email: string;
  createdAt: string;
};

export type CaseStatus = 'New' | 'In Follow-up' | 'Partially Paid' | 'Closed';

export const caseStatuses: [CaseStatus, ...CaseStatus[]] = ['New', 'In Follow-up', 'Partially Paid', 'Closed'];

export type Case = {
  id: string;
  clientId: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceDate: string; // ISO 8601 string
  dueDate: string; // ISO 8601 string
  status: CaseStatus;
  lastFollowUpNotes: string;
  createdAt: string;
};

export type CaseWithClient = Case & {
    clientName: string;
    companyName: string;
};
