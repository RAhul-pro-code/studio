'use client';

import Link from 'next/link';
import { PlusCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppHeader() {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="flex-1" />
      <Button variant="outline" size="sm" asChild>
        <Link href="/clients/new">
          <UserPlus className="mr-2 h-4 w-4" /> Add New Client
        </Link>
      </Button>
    </header>
  );
}
