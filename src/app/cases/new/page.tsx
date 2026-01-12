import { getClients } from '@/lib/data';
import { NewCaseForm } from './form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NewCasePage() {
  const clients = await getClients();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Create New Case</CardTitle>
        </CardHeader>
        <CardContent>
          <NewCaseForm clients={clients} />
        </CardContent>
      </Card>
    </div>
  );
}
