import { Content, Hero, Sidebar } from '@/components'
import { BlogsType } from '@/interfaces/blogs.interface'
import { CategoriesType } from '@/interfaces/categories.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'

function IndexPage({ blogs, latestBlog, categories }: HomePageProps) {
	return (
		<SEO>
			<Layout>
				<Hero blogs={blogs.slice(0, 3)} />
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						padding: '30px',
						flexDirection: { xs: 'column', md: 'row' },
					}}
				>
					<Sidebar latestBlog={latestBlog} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	)
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<
	HomePageProps
> = async () => {
	const blogs = await BlogsService.getAllBlogs()
	const latestBlog = await BlogsService.getLatestBlog()
	const categories = await BlogsService.getCategories()

	return {
		props: {
			blogs,
			latestBlog,
			categories,
		},
	}
}

interface HomePageProps {
	blogs: BlogsType[]
	latestBlog: BlogsType[]
	categories: CategoriesType[]
}
