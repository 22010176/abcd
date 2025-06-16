import { clsx, } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function inDateToDate(dateString = '') {
	const [year, month, day] = dateString.split("-").map((i) => +i);
	return new Date(year, month - 1, day);
}

export function dateToInDate(date = '') {
	const [year, month, day] = date.split("T")[0].split("-").map((i) => +i);
	return `${year}-${month.toString().padStart(2, "0")}-${(day + 1).toString().padStart(2, "0")}`;
}