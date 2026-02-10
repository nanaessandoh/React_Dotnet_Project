import { type DateArg, format } from "date-fns";
import z from "zod";

const dateFormat = 'dd MMM yyyy h:mm aa';

export const formatDate = (date: DateArg<Date>): string => {
    return format(date, dateFormat);
}

export const requiredString = (fieldName: string) => z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });