import theme from '@/helpers/theme'
import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

function MyApp(props: AppProps) {
	const { Component, pageProps, router } = props

	useEffect(() => {
		const handleRouteStart = () => NProgress.start()
		const handleRouteDone = () => NProgress.done()

		router.events.on('routeChangeStart', handleRouteStart)
		router.events.on('routeChangeComplete', handleRouteDone)
		router.events.on('routeChangeError', handleRouteDone)

		return () => {
			router.events.off('routeChangeStart', handleRouteStart)
			router.events.off('routeChangeComplete', handleRouteDone)
			router.events.off('routeChangeError', handleRouteDone)
		}
	}, [])

	return (
		<AppCacheProvider {...props}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</AppCacheProvider>
	)
}

export default MyApp
