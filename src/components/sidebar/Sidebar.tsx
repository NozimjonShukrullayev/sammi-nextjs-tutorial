import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { SidebarProps } from './sidebar.props'

const data = [
	{
		image: 'https://media.graphassets.com/MxJZhmooRRuudoErkQ38',
		title: 'Technical SEO with Hygraph',
		exerpt:
			'Get started with your SEO implementation when using a Headless CMS',
		author: {
			name: 'Samar Badriddinov',
			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
		},
	},
	{
		image: 'https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h',
		title: 'Union Types and Sortable Relations with Hygraph',
		exerpt:
			'Learn more about Polymorphic Relations and Sortable Relations with Hygraph',
		author: {
			name: 'Samar Badriddinov',
			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
		},
	},
]

function Sidebar({ latestBlog, categories }: SidebarProps) {
	const router = useRouter()

	return (
		<Box width={{ xs: '100%', md: '30%' }}>
			<Box position='sticky' top='80px'>
				{/* Latest blog */}
				<Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'}>
					<Typography variant='h6'>Latest blog</Typography>
					<Box
						sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
					>
						{latestBlog.map(item => (
							<Box
								key={item.id}
								onClick={() => router.push(`/blog/${item.slug}`)}
								marginTop={'20px'}
								sx={{ cursor: 'pointer' }}
							>
								<Box
									sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
								>
									<Image
										src={item.image.url}
										alt={item.title}
										width={100}
										height={100}
										style={{ objectFit: 'cover' }}
									/>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											gap: '10px',
										}}
									>
										<Typography variant='body1'>{item.title}</Typography>
										<Box display={'flex'} gap={'5px'}>
											<Avatar
												alt={item.author.name}
												src={item.author.avatar.url}
											/>
											<Box>
												<Typography variant='body2'>
													{item.author.name}
												</Typography>
												<Box sx={{ opacity: '0.6' }}>
													{format(new Date(item.createdAt), 'dd MMM, yyyy')}
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>

				{/* Category */}
				<Box
					padding={'20px'}
					marginTop={'20px'}
					border={'1px solid gray'}
					borderRadius={'8px'}
				>
					<Typography variant='h6'>Category</Typography>
					<Box
						sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
					>
						{categories.map(category => (
							<Fragment key={category.slug}>
								<Button
									fullWidth
									sx={{ justifyContent: 'flex-start', height: '50px' }}
									onClick={() => router.push(`/category/${category.slug}`)}
								>
									{category.label}
								</Button>
								<Divider sx={{ backgroundColor: 'gray' }} />
							</Fragment>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Sidebar
