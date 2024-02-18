import { render, screen, userEvent, waitFor, debug } from './utils/test-utils';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node'
import FetchRenderTest from './FetchRenderTest';

const handlers = [
    http.put('https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test', () => {
        return HttpResponse.json({"msg":"Invalid request"}, {status: 400}) // Simulate error response
    })]
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders ErrorModal when fetch fails', async () => {
    render(<FetchRenderTest />);

    const testingStartButton = screen.getByText('Testing Start');

    // Click the button to trigger the fetch request
    await userEvent.click(testingStartButton);
    
});
