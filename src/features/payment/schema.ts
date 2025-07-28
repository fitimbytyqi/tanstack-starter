import * as z from "zod/mini";

export const paymentSchema = z.object({
	id: z.string(),
	amount: z.number(),
	status: z.enum(['pending', 'paid', 'failed'] as const),
    email: z.email(),
});
export type Payment = z.infer<typeof paymentSchema>;