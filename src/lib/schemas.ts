import { z } from 'zod';
import { caseStatuses } from './types';

export const clientSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters."),
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  contactPerson: z.string().min(2, "Contact person must be at least 2 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  email: z.string().email("Invalid email address."),
});

export const caseSchema = z.object({
  clientId: z.string().min(1, "A client must be selected."),
  invoiceNumber: z.string().min(1, "Invoice number is required."),
  invoiceAmount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Invoice amount must be a positive number.",
  }),
  invoiceDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invoice date is required.",
  }),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Due date is required.",
  }),
  status: z.enum(caseStatuses, {
    errorMap: () => ({ message: "Please select a valid status." }),
  }),
});

export const updateCaseSchema = z.object({
  status: z.enum(caseStatuses),
  lastFollowUpNotes: z.string().min(1, "Follow-up notes are required."),
});
