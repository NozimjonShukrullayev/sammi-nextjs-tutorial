import { calculateReadingTime } from '@/helpers/time.format'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ContentProps } from './content.props'

// const data = [
// 	{
// 		image: 'https://media.graphassets.com/MxJZhmooRRuudoErkQ38',
// 		title: 'Technical SEO with Hygraph',
// 		exerpt: 'Get started with your SEO implementation when using a Headless CMS',
// 		author: {
// 			name: 'Samar Badriddinov',
// 			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
// 		},
// 	},
// 	{
// 		image: 'https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h',
// 		title: 'Union Types and Sortable Relations with Hygraph',
// 		exerpt: 'Learn more about Polymorphic Relations and Sortable Relations with Hygraph',
// 		author: {
// 			name: 'Samar Badriddinov',
// 			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
// 		},
// 	},
// ];

function Content({ blogs }: ContentProps) {
	const router = useRouter()

	return (
		<Box width={{ xs: '100%', md: '70%' }}>
			{blogs.map(item => (
				<Box
					key={item.id}
					onClick={() => router.push(`/blog/${item.slug}`)}
					sx={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						padding: '20px',
						marginTop: '20px',
						borderRadius: '8px',
						boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)',
						cursor: 'pointer',
					}}
				>
					<Box
						position={'relative'}
						width={'100%'}
						height={{ xs: '35vh', md: '50vh' }}
					>
						<Image
							src={item.image.url}
							alt={item.title}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</Box>
					<Typography variant='h4' marginTop={'30px'}>
						{item.title}
					</Typography>
					<Typography variant='body1' color='gray'>
						{item.excerpt}
					</Typography>
					<Divider sx={{ marginTop: '30px', backgroundColor: 'gray' }} />
					<Box display={'flex'} gap={'10px'} marginTop={'20px'}>
						<Avatar alt={item.author.name} src={item.author.avatar.url} />
						<Box>
							<Typography>{item.author.name}</Typography>
							<Box color={'gray'}>
								{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
								{calculateReadingTime(item.description.text)}
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default Content
