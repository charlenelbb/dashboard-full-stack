import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</RecoilRoot>
		</QueryClientProvider>
	)
}

export default App
