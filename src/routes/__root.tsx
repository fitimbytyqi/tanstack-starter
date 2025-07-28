/// <reference types="vite/client" />

import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';

// styles
import appCss from '~/styles/app.css?url';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: [
				{
					charSet: 'utf-8',
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					title: 'TanStack Start Starter',
				},
			],
			links: [{ rel: 'stylesheet', href: appCss }],
			scripts: [
				{
					src: '//unpkg.com/react-scan/dist/auto.global.js',
					crossOrigin: 'anonymous',
				},
			],
		}),
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<ReactQueryDevtools buttonPosition='bottom-left' />
				<TanStackRouterDevtools position='bottom-right' />
				<Scripts />
			</body>
		</html>
	);
}
