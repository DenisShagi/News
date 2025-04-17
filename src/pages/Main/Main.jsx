import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import { getCategories, getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/Pagination/Pagination'
import Categories from '../../components/Categories/Categories'
import { useDebounce } from '../../helpers/hooks/useDebounce'

const Main = () => {
	const [news, setNews] = useState([])
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [keyWords, setKeyWords] = useState('')

	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10

	const debouncedKeyWords = useDebounce(keyWords, 500)

	const fetchNews = async currentPage => {
		try {
			setIsLoading(true)
			const response = await getNews({
				page_number: currentPage,
				page_size: pageSize,
				category: selectedCategory === 'All' ? null : selectedCategory,
				keyWords: debouncedKeyWords,
			})
			setNews(response.news)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await getCategories()
			setCategories(['All', ...response.categories])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage, selectedCategory, debouncedKeyWords])

	useEffect(() => {
		fetchCategories()
	}, [])
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePageClick = pageNumber => {
		setCurrentPage(pageNumber)
	}

	 const handleCategoryChange = category => {
			setCurrentPage(1)
			setSelectedCategory(category)
		}

	return (
		<main className={styles.main}>
			<Categories
				categories={categories}
				setSelectedCategory={handleCategoryChange}
				selectedCategory={selectedCategory}
			/>

			<Search keyWords={keyWords} setKeyWords={setKeyWords}/>
			{news.length > 0 && !isLoading ? (
				<NewsBanner item={news[0]} />
			) : (
				<Skeleton type={'banner'} count={1} />
			)}
			<Pagination
				totalPages={totalPages}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type={'item'} count={10} />
			)}

			<Pagination
				totalPages={totalPages}
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
		</main>
	)
}

export default Main
