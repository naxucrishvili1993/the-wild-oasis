import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useUrl } from "../hooks/useUrl";

function SortBy({ options }) {
	const { readUrl, updateUrl } = useUrl();
	const sortBy = readUrl("sortBy") || "";

	function handleChange(e) {
		updateUrl("sortBy", e.target.value);
	}

	return (
		<Select
			options={options}
			type="white"
			value={sortBy}
			onChange={handleChange}
		/>
	);
}

export default SortBy;
