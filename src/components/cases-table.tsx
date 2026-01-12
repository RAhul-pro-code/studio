'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown, Search, X } from 'lucide-react';
import Link from 'next/link';

import type { CaseStatus, CaseWithClient } from '@/lib/types';
import { caseStatuses } from '@/lib/types';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardContent } from './ui/card';

interface CasesTableProps {
  cases: CaseWithClient[];
}

export function CasesTable({ cases }: CasesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort');
  const query = searchParams.get('q') || '';

  const createQueryString = React.useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleStatusChange = (status: string) => {
    router.push(`/?${createQueryString({ status: status === 'all' ? null : status })}`);
  };

  const handleSort = () => {
    const newSort = sort === 'asc' ? 'desc' : 'asc';
    router.push(`/?${createQueryString({ sort: newSort })}`);
  };
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    router.push(`/?${createQueryString({ q: searchQuery || null })}`);
  };
  
  const clearSearch = () => {
    router.push(`/?${createQueryString({ q: null })}`);
  };


  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b">
          <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search by client or invoice..."
              className="w-full rounded-lg bg-background pl-8"
              defaultValue={query}
            />
            {query && (
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                </Button>
            )}
          </form>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {caseStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={handleSort} className="-ml-4">
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.length > 0 ? (
                cases.map((caseItem) => (
                  <TableRow key={caseItem.id} className="cursor-pointer" onClick={() => router.push(`/cases/${caseItem.id}`)}>
                    <TableCell>
                      <div className="font-medium">{caseItem.clientName}</div>
                      <div className="text-sm text-muted-foreground">{caseItem.companyName}</div>
                    </TableCell>
                    <TableCell>{caseItem.invoiceNumber}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(caseItem.invoiceAmount)}
                    </TableCell>
                    <TableCell>{formatDate(caseItem.dueDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={caseItem.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No cases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
