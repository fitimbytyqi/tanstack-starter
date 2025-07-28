import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';

// TODO: make the form work with columns too
import { columns } from '~/features/payment/columns';

import { DataTable } from '~/features/payment/data-table';
import type { Payment } from '~/features/payment/schema';

const data: Payment[] = [
	{
		id: '1',
		amount: 100,
		status: 'paid',
		email: 'test@example.com',
	},
	{
		id: '2',
		amount: 200,
		status: 'failed',
		email: 'test2@example.com',
	},
	{
		id: '3',
		amount: 300,
		status: 'pending',
		email: 'test3@example.com',
	},
	{
		id: '4',
		amount: 150,
		status: 'paid',
		email: 'alice@company.com',
	},
	{
		id: '5',
		amount: 75,
		status: 'pending',
		email: 'bob@startup.io',
	},
	{
		id: '6',
		amount: 500,
		status: 'failed',
		email: 'charlie@tech.org',
	},
	{
		id: '7',
		amount: 250,
		status: 'paid',
		email: 'diana@business.net',
	},
	{
		id: '8',
		amount: 180,
		status: 'pending',
		email: 'eve@finance.com',
	},
	{
		id: '9',
		amount: 320,
		status: 'paid',
		email: 'frank@marketing.co',
	},
	{
		id: '10',
		amount: 90,
		status: 'failed',
		email: 'grace@design.studio',
	},
];

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	const form = useForm({
		defaultValues: {
			items: data,
		},
		onSubmit({ value }) {
			console.log({ value });
		},
	});

	const columns = useMemo<ColumnDef<Payment>[]>(() => {
		return [
			{
				accessorKey: 'status',
				header: 'Status',
			},
			{
				accessorKey: 'email',
				header: 'Email',
				cell: ({ row }) => (
					<form.Field name={`items[${row.index}].email`} mode='array'>
						{(field) => (
							<input
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					</form.Field>
				),
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
			},
		];
	}, []);

	return (
		<div className='container mx-auto py-10'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Button
					type='button'
					className='ml-auto flex'
					onClick={() =>
						form.pushFieldValue('items', {
							id: crypto.randomUUID(),
							amount: 0,
							status: 'pending',
							email: '',
						})
					}
				>
					<PlusIcon />
					Add new row
				</Button>

				<div className='my-5'>
					<form.Field name='items' mode='array'>
						{(field) => (
							<DataTable columns={columns} data={field.state.value} />
						)}
					</form.Field>
				</div>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button disabled={!canSubmit} className='w-full'>
							{isSubmitting ? '...' : 'Submit'}
						</Button>
					)}
				/>
			</form>
		</div>
	);
}
