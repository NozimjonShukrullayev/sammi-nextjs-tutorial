import { Content, Sidebar } from '@/components'
import { BlogsType } from '@/interfaces/blogs.interface'
import { CategoriesType } from '@/interfaces/categories.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

function CategoryDetailedPage({
	blogs,
	latestBlog,
	categories,
}: CategoriesDetailedPageProps) {
	const router = useRouter()

	return (
		<SEO metaTitle={`${router.query.slug}-category`}>
			<Layout>
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

export default CategoryDetailedPage

export const getServerSideProps: GetServerSideProps<
	CategoriesDetailedPageProps
> = async ({ query }) => {
	const blogs = await BlogsService.getDetailedCategoriesBlog(
		query.slug as string
	)
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

interface CategoriesDetailedPageProps {
	blogs: BlogsType[]
	latestBlog: BlogsType[]
	categories: CategoriesType[]
}
