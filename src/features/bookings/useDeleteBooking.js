import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { mutate: delBooking, isLoading: isDeleting } = useMutation({
		mutationFn: (bookingId) => deleteBooking(bookingId),
		onSuccess: () => {
			toast.success(`Booking successfully deleted!`);

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
		onError: () => toast.error("There was an error while deleting a booking!"),
	});

	return { delBooking, isDeleting };
}

export default useDeleteBooking;
