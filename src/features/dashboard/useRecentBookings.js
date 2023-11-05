import { subDays } from "date-fns";
import { useUrl } from "../../hooks/useUrl";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
	const { readUrl } = useUrl();

	const numDays = !readUrl("last") ? 7 : +readUrl("last");

	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: bookings } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ["bookings", `last-${numDays}`],
	});

	return { isLoading, bookings };
}
