import { subDays } from "date-fns";
import { useUrl } from "../../hooks/useUrl";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
	const { readUrl } = useUrl();

	const numDays = !readUrl("last") ? 7 : +readUrl("last");

	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: stays } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ["stays", `last-${numDays}`],
	});

	const confirmedStays = stays?.filter(
		(stay) => stay.status === "checked-in" || stay.status === "checked-out"
	);

	return { isLoading, stays, confirmedStays, numDays };
}
