import { navItems } from '@/config/constants'
import AdjustIcon from '@mui/icons-material/Adjust'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
	window?: () => Window
}

function Navbar({ window }: Props) {
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState)
	}

	const mobileToggleHandler = (route: string) => {
		router.push(route)
		handleDrawerToggle()
	}

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				paddingX={'20px'}
			>
				<Box
					onClick={() => mobileToggleHandler('/')}
					display={'flex'}
					alignItems={'center'}
					gap={'5px'}
					component='div'
					sx={{ my: '2', cursor: 'pointer' }}
				>
					<AdjustIcon />
					<Typography variant='h6'>Sammi</Typography>
				</Box>
				<CloseIcon onClick={handleDrawerToggle} sx={{ cursor: 'pointer' }} />
			</Box>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem key={item.route} disablePadding>
						<ListItemButton
							onClick={() => mobileToggleHandler(item.route)}
							sx={{ textAlign: 'center' }}
						>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	const container =
		window !== undefined ? () => window().document.body : undefined

	const router = useRouter()

	return (
		<Box sx={{ display: 'flex' }} height={'10vh'}>
			<AppBar
				component='nav'
				sx={{ height: '10vh', backgroundColor: '#141414' }}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Box
						onClick={() => router.push('/')}
						alignItems={'center'}
						component='div'
						gap={'5px'}
						sx={{
							my: '2',
							flexGrow: 1,
							display: { xs: 'none', sm: 'flex' },
							cursor: 'pointer',
						}}
					>
						<AdjustIcon />
						<Typography variant='h5'>Sammi</Typography>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								onClick={() => router.push(item.route)}
								key={item.route}
								sx={{ color: '#fff' }}
							>
								{item.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	)
}

export default Navbar
