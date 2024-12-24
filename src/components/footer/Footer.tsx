import { Instagram, Telegram, YouTube } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'

function Footer() {
	return (
		<Box
			padding={'30px'}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#141414',
				color: 'white',
				borderTop: '1px solid rgba(255, 255, 255, 0.5)',
			}}
		>
			<Typography>
				@ {format(new Date(), 'yyyy')} Sammi. All Rights Reserved
			</Typography>
			<Box display={'flex'} gap={'15px'}>
				<Telegram sx={{ cursor: 'pointer' }} />
				<Instagram sx={{ cursor: 'pointer' }} />
				<YouTube sx={{ cursor: 'pointer' }} />
			</Box>
		</Box>
	)
}

export default Footer
