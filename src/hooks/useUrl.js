import { useSearchParams } from "react-router-dom";

export function useUrl() {
	const [searchParams, setSearchParams] = useSearchParams();

	function updateUrl(field, value) {
		searchParams.set(field, value);
		setSearchParams(searchParams);
	}

	const readUrl = (field = null) =>
		field ? searchParams.get(field) : Object.fromEntries([...searchParams]);

	return { readUrl, updateUrl };
}
