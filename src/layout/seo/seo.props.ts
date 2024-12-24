import { ReactNode } from 'react'

export interface SeoProps {
	author?: string
	children: ReactNode
	metaDescription?: string
	metaKeywords?: string
	metaTitle?: string
}
