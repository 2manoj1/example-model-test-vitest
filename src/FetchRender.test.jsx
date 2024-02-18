import {
	render,
	screen,
	userEvent,
	waitFor,
	debug,
	act,
} from "./utils/test-utils";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import FetchRenderTest from "./FetchRenderTest";

const handlers = [
	http.put("https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test", () => {
		return HttpResponse.json({ msg: "Invalid request" }, { status: 400 }); // Simulate error response
	}),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders ErrorModal when fetch fails", async () => {
	render(<FetchRenderTest />, { container: document.body });

	const testingStartButton = screen.getByText("Testing Start");
	await act(async () => {
		// Click the button to trigger the fetch request
		await userEvent.click(testingStartButton);
	});

	// Wait for the ErrorModal to render
	await waitFor(() => {
		const errorModal = screen.getByRole("dialog");
		expect(errorModal).toBeInTheDocument();
	});

	// Verify the modal content
	const modalTitle = screen.getByText("Modal, Dialog Test");
	expect(modalTitle).toBeInTheDocument();

	// Verify the close button is rendered
	const closeButton = screen.getByRole("button", {
		name: /Error dialog close/i,
	});
	expect(closeButton).toBeInTheDocument();
});
