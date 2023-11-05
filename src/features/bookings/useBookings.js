import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUrl } from "../../hooks/useUrl";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
	const { readUrl } = useUrl();

	//! FILTER
	const filterValue = readUrl("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };
	// : { field: "totalPrice", value: 5000, method: "gte" };

	//! SORT
	const sortByRaw = readUrl("sortBy") || "startDate-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	//! PAGINATION
	const page = !readUrl("page") ? 1 : Number(readUrl("page"));

	//! QUERY
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	//! PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, count };
}
