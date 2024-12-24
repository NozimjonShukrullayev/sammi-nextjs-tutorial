import { CategoriesType } from '@/interfaces/categories.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

function CategoryPage({ categories }: CategoriesPageProps) {
	const router = useRouter()

	return (
		<SEO metaTitle='All Categories'>
			<Layout>
				<Box
					width={{ xs: '100%', md: '80%' }}
					marginX={'auto'}
					marginTop={'10vh'}
					borderRadius={'8px'}
					height={{ xs: '35vh', md: '50vh' }}
					sx={{
						backgroundColor: 'black',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						rowGap: '15px',
					}}
				>
					<Typography variant='h3' fontFamily={'cursive'}>
						All Categories
					</Typography>
					<ButtonGroup
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', sm: 'row' },
							rowGap: '10px',
						}}
						variant='contained'
						aria-label='outlined primary button group'
					>
						{categories.map(category => (
							<Button
								sx={{ marginX: '2px' }}
								key={category.slug}
								onClick={() => router.push(`/category/${category.slug}`)}
							>
								# {category.label}
							</Button>
						))}
					</ButtonGroup>
				</Box>
			</Layout>
		</SEO>
	)
}

export default CategoryPage

export const getServerSideProps: GetServerSideProps<
	CategoriesPageProps
> = async () => {
	const categories = await BlogsService.getCategories()

	return {
		props: {
			categories,
		},
	}
}

interface CategoriesPageProps {
	categories: CategoriesType[]
}
