import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
	align-items: center;
	background-color: var(--color-grey-50);
	display: flex;
	height: 100dvh;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	// 1. Load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. If there is NO authenticated user, redirect to the /login

	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate("/login");
	}, [isAuthenticated, isLoading, navigate]);

	// 3. While loading, show a spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. if there IS a user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
