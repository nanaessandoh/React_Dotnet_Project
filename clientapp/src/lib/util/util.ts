import { type DateArg, format } from "date-fns";

const dateFormat = 'dd MMM yyyy h:mm aa';

export const formatDate = (date: DateArg<Date>): string => {
    return format(date, dateFormat);
}