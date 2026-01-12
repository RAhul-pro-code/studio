import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText, Landmark, User, Hash, DollarSign } from 'lucide-react';

import { getCaseById, getClientById } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UpdateCaseForm } from './update-form';

export default async function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const caseData = await getCaseById(params.id);

  if (!caseData) {
    notFound();
  }

  const client = await getClientById(caseData.clientId);

  if (!client) {
    // This should ideally not happen if data integrity is maintained
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild className="-ml-4">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cases
            </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="font-headline text-2xl">Case Details</CardTitle>
                    <StatusBadge status={caseData.status} />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span><strong>Invoice #:</strong> {caseData.invoiceNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span><strong>Amount:</strong> {formatCurrency(caseData.invoiceAmount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span><strong>Invoice Date:</strong> {formatDate(caseData.invoiceDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span><strong>Due Date:</strong> {formatDate(caseData.dueDate)}</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Last Follow-up Notes
                        </h4>
                        <p className="text-muted-foreground text-sm">
                            {caseData.lastFollowUpNotes || 'No notes yet.'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Update Case</CardTitle>
                    <CardDescription>Update the status and add follow-up notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateCaseForm caseData={caseData} />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <strong>{client.clientName}</strong>
                    </div>
                     <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                        <span>{client.companyName}, {client.city}</span>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                        <p><strong>Contact:</strong> {client.contactPerson}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${client.email}`} className="text-primary hover:underline">{client.email}</a></p>
                        <p><strong>Phone:</strong> <a href={`tel:${client.phone}`} className="text-primary hover:underline">{client.phone}</a></p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
