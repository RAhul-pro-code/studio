import { subDays, addDays } from 'date-fns';
import type { Client, Case } from './types';

// In-memory store
let clients: Client[] = [
  {
    id: '1',
    clientName: 'Alice Johnson',
    companyName: 'Innovate Inc.',
    city: 'New York',
    contactPerson: 'Alice Johnson',
    phone: '123-456-7890',
    email: 'alice@innovate.com',
    createdAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: '2',
    clientName: 'Bob Smith',
    companyName: 'Solutions Co.',
    city: 'San Francisco',
    contactPerson: 'Bob Smith',
    phone: '098-765-4321',
    email: 'bob@solutions.co',
    createdAt: subDays(new Date(), 25).toISOString(),
  },
  {
    id: '3',
    clientName: 'Charlie Brown',
    companyName: 'Data Corp.',
    city: 'Chicago',
    contactPerson: 'Charlie Brown',
    phone: '555-555-5555',
    email: 'charlie@datacorp.com',
    createdAt: subDays(new Date(), 40).toISOString(),
  },
  {
    id: '4',
    clientName: 'Rahul',
    companyName: 'AssuredPay',
    city: 'Banglore',
    contactPerson: 'Rahul',
    phone: '9900930521',
    email: 'Rahul@123gmail.com',
    createdAt: subDays(new Date(), 5).toISOString(),
  },
];

let cases: Case[] = [
  {
    id: '101',
    clientId: '1',
    invoiceNumber: 'INV-001',
    invoiceAmount: 1500.0,
    invoiceDate: subDays(new Date(), 45).toISOString(),
    dueDate: subDays(new Date(), 15).toISOString(),
    status: 'In Follow-up',
    lastFollowUpNotes: 'Called client, left a voicemail.',
    createdAt: subDays(new Date(), 45).toISOString(),
  },
  {
    id: '102',
    clientId: '2',
    invoiceNumber: 'INV-002',
    invoiceAmount: 2500.5,
    invoiceDate: subDays(new Date(), 60).toISOString(),
    dueDate: subDays(new Date(), 30).toISOString(),
    status: 'New',
    lastFollowUpNotes: '',
    createdAt: subDays(new Date(), 60).toISOString(),
  },
  {
    id: '103',
    clientId: '1',
    invoiceNumber: 'INV-003',
    invoiceAmount: 800.75,
    invoiceDate: subDays(new Date(), 20).toISOString(),
    dueDate: addDays(new Date(), 10).toISOString(),
    status: 'New',
    lastFollowUpNotes: '',
    createdAt: subDays(new Date(), 20).toISOString(),
  },
  {
    id: '104',
    clientId: '3',
    invoiceNumber: 'INV-004',
    invoiceAmount: 5000.0,
    invoiceDate: subDays(new Date(), 90).toISOString(),
    dueDate: subDays(new Date(), 60).toISOString(),
    status: 'Partially Paid',
    lastFollowUpNotes: 'Client paid $2000. Promised to pay the rest next month.',
    createdAt: subDays(new Date(), 90).toISOString(),
  },
  {
    id: '105',
    clientId: '2',
    invoiceNumber: 'INV-005',
    invoiceAmount: 1200.0,
    invoiceDate: subDays(new Date(), 120).toISOString(),
    dueDate: subDays(new Date(), 90).toISOString(),
    status: 'Closed',
    lastFollowUpNotes: 'Invoice paid in full.',
    createdAt: subDays(new Date(), 120).toISOString(),
  },
  {
    id: '106',
    clientId: '4',
    invoiceNumber: 'INV-006',
    invoiceAmount: 350.0,
    invoiceDate: subDays(new Date(), 10).toISOString(),
    dueDate: addDays(new Date(), 20).toISOString(),
    status: 'New',
    lastFollowUpNotes: '',
    createdAt: subDays(new Date(), 10).toISOString(),
  },
];

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getClients(): Promise<Client[]> {
  await delay(100);
  return [...clients];
}

export async function getClientById(id: string): Promise<Client | undefined> {
  await delay(100);
  return clients.find(c => c.id === id);
}

export async function addClient(clientData: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
  await delay(500);
  const newClient: Client = {
    ...clientData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  clients.push(newClient);
  return newClient;
}

export async function getCases(): Promise<Case[]> {
  await delay(100);
  return [...cases];
}

export async function getCaseById(id: string): Promise<Case | undefined> {
  await delay(100);
  return cases.find(c => c.id === id);
}

export async function addCase(caseData: Omit<Case, 'id' | 'createdAt'>): Promise<Case> {
  await delay(500);
  const newCase: Case = {
    ...caseData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  cases.unshift(newCase);
  return newCase;
}

export async function updateCase(id: string, updateData: Partial<Omit<Case, 'id' | 'clientId'>>): Promise<Case | undefined> {
  await delay(500);
  const caseIndex = cases.findIndex(c => c.id === id);
  if (caseIndex !== -1) {
    cases[caseIndex] = { ...cases[caseIndex], ...updateData };
    return cases[caseIndex];
  }
  return undefined;
}
