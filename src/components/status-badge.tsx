import { Badge } from '@/components/ui/badge';
import type { CaseStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: CaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<CaseStatus, string> = {
    New: 'border-transparent bg-secondary text-secondary-foreground',
    'In Follow-up': 'border-accent text-accent',
    'Partially Paid': 'border-transparent bg-primary text-primary-foreground',
    Closed: 'border-transparent bg-muted text-muted-foreground',
  };

  return (
    <Badge
      className={cn('hover:bg-none', statusStyles[status])}
      variant={status === 'In Follow-up' ? 'outline' : 'default'}
    >
      {status}
    </Badge>
  );
}
