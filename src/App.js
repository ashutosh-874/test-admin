import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import CustomerDetail from "./pages/CustomerDetail";
import HomePage from "./pages/HomePage";
import OrderDetail from "./pages/OrderDetail";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: ":customerId",
		element: <CustomerDetail />,
	},
	{
		path: "orders/:orderId",
		element: <OrderDetail />
	}
]);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
