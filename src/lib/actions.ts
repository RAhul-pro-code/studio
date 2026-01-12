'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addCase, addClient, updateCase as dbUpdateCase } from '@/lib/data';
import { clientSchema, caseSchema, updateCaseSchema } from '@/lib/schemas';

export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const validatedFields = clientSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
    };
  }
  try {
    await addClient(validatedFields.data);
  } catch (e) {
    return { message: 'Failed to create client.' };
  }

  revalidatePath('/');
  revalidatePath('/cases/new');
  redirect('/');
}

export async function createCase(
  prevState: { message: string },
  formData: FormData
) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = caseSchema.safeParse({
    ...rawData,
    invoiceAmount: parseFloat(rawData.invoiceAmount as string),
    invoiceDate: new Date(rawData.invoiceDate as string),
    dueDate: new Date(rawData.dueDate as string),
  });
  
  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    await addCase({
      ...validatedFields.data,
      invoiceDate: validatedFields.data.invoiceDate.toISOString(),
      dueDate: validatedFields.data.dueDate.toISOString(),
    });
  } catch (e) {
    return { message: 'Failed to create case.' };
  }
  
  revalidatePath('/');
  redirect('/');
}


export async function updateCase(
  id: string,
  prevState: { message: string },
  formData: FormData
) {
  const validatedFields = updateCaseSchema.safeParse({
    status: formData.get('status'),
    lastFollowUpNotes: formData.get('lastFollowUpNotes'),
  });

  if (!validatedFields.success) {
    return {
        message: 'Invalid data. Please check your inputs.',
    }
  }

  try {
    await dbUpdateCase(id, validatedFields.data);
  } catch (error) {
    return { message: 'Failed to update case.' };
  }

  revalidatePath(`/cases/${id}`);
  revalidatePath('/');
  return { message: 'Case updated successfully.' };
}
