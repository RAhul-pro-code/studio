'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast"

import { updateCase } from '@/lib/actions';
import { updateCaseSchema } from '@/lib/schemas';
import type { Case, CaseStatus } from '@/lib/types';
import { caseStatuses } from '@/lib/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type UpdateCaseFormValues = z.infer<typeof updateCaseSchema>;

export function UpdateCaseForm({ caseData }: { caseData: Case }) {
  const { toast } = useToast();
  const updateCaseWithId = updateCase.bind(null, caseData.id);
  const [state, formAction] = useFormState(updateCaseWithId, { message: '' });

  const form = useForm<UpdateCaseFormValues>({
    resolver: zodResolver(updateCaseSchema),
    defaultValues: {
      status: caseData.status,
      lastFollowUpNotes: '',
    },
  });
  
  useEffect(() => {
    if (state.message) {
      if (state.message.includes('success')) {
        toast({
            title: "Success",
            description: state.message,
        });
        form.reset({
            status: form.getValues('status'),
            lastFollowUpNotes: ''
        });
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        {state?.message && !state.message.includes('success') && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {caseStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="lastFollowUpNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Follow-up Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Called client, sent a reminder email..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>Update Case</SubmitButton>
      </form>
    </Form>
  );
}
