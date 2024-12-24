import { Sidebar } from '@/components'
import { calculateReadingTime } from '@/helpers/time.format'
import { BlogsType } from '@/interfaces/blogs.interface'
import { CategoriesType } from '@/interfaces/categories.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

function DetailedBlogsPage({
	blog,
	latestBlog,
	categories,
}: DetailedBlogsPageProps) {
	return (
		<SEO metaTitle={blog.title}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						padding: '30px',
						flexDirection: { xs: 'column', md: 'row' },
					}}
				>
					<Box width={{ xs: '100%', md: '70%' }}>
						<Box
							sx={{
								backgroundColor: 'black',
								padding: '20px',
								borderRadius: '8px',
								boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)',
							}}
							position={'relative'}
							width={'100%'}
							height={{ xs: '35vh', md: '50vh' }}
						>
							<Image
								src={blog.image.url}
								alt={blog.title}
								fill
								style={{ objectFit: 'cover' }}
							/>
						</Box>
						<Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
							<Box sx={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
								<Avatar alt={blog.author.name} src={blog.author.avatar.url} />
								<Box>
									<Typography>{blog.author.name}</Typography>
									<Box color={'gray'}>
										{format(new Date(blog.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
										{calculateReadingTime(blog.description.text)}
									</Box>
								</Box>
							</Box>
							<Typography variant='h3' marginTop={'10px'}>
								{blog.title}
							</Typography>
							<Typography color='gray'>{blog.excerpt}</Typography>
							<Divider sx={{ marginTop: '30px', backgroundColor: 'gray' }} />
							<div
								style={{ opacity: '0.7' }}
								dangerouslySetInnerHTML={{ __html: blog.description.html }}
							/>
						</Box>
					</Box>
					<Sidebar latestBlog={latestBlog} categories={categories} />
				</Box>
			</Layout>
		</SEO>
	)
}

export default DetailedBlogsPage

export const getServerSideProps: GetServerSideProps<
	DetailedBlogsPageProps
> = async ({ query }) => {
	const blog = await BlogsService.getDetailedBlogs(query.slug as string)
	const latestBlog = await BlogsService.getLatestBlog()
	const categories = await BlogsService.getCategories()

	return {
		props: {
			blog,
			latestBlog,
			categories,
		},
	}
}

interface DetailedBlogsPageProps {
	blog: BlogsType
	latestBlog: BlogsType[]
	categories: CategoriesType[]
}
