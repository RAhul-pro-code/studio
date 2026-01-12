import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getCases, getClients } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CasesTable } from "@/components/cases-table";
import type { CaseStatus } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    status?: string;
    sort?: string;
    q?: string;
  };
}) {
  const allCases = await getCases();
  const clients = await getClients();

  const clientMap = new Map(clients.map(c => [c.id, c]));

  let casesWithClients = allCases.map(c => ({
    ...c,
    clientName: clientMap.get(c.clientId)?.clientName || "Unknown",
    companyName: clientMap.get(c.clientId)?.companyName || "Unknown",
  }));

  if (searchParams?.status) {
    casesWithClients = casesWithClients.filter(
      (c) => c.status === searchParams.status
    );
  }

  if (searchParams?.q) {
    const query = searchParams.q.toLowerCase();
    casesWithClients = casesWithClients.filter(c => 
      c.clientName.toLowerCase().includes(query) ||
      c.invoiceNumber.toLowerCase().includes(query)
    );
  }

  if (searchParams?.sort) {
    casesWithClients.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return searchParams.sort === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
          Invoice Recovery Cases
        </h1>
        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/cases/new">
              <PlusCircle className="mr-2 h-4 w-4" /> New Case
            </Link>
          </Button>
        </div>
      </div>
      <CasesTable cases={casesWithClients} />
    </div>
  );
}
