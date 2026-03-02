import { z } from 'zod';
import { requiredString } from '../util/util';

export const profileSchema = z.object({
    displayName: requiredString("Title"),
    bio: z.string().optional().nullable()
});

export type ProfileSchema = z.infer<typeof profileSchema>;