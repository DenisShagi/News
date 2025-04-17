import styles from './styles.module.css'

const Pagination = ({
	totalPages,
	handleNextPage,
	handlePrevPage,
	handlePageClick,
	currentPage,
}) => {
	return (
		<div className={styles.pagination}>
			<button
				onClick={handlePrevPage}
				className={styles.arrow}
				disabled={currentPage <= 1}
			>
				{'<'}
			</button>

			<div className={styles.list}>
				{[...Array(totalPages)].map((_, idx) => (
					<button
						onClick={() => handlePageClick(idx + 1)}
						disabled={idx + 1 === currentPage}
						key={idx}
						className={styles.pageNumber}
					>
						{idx + 1}
					</button>
				))}
			</div>

			<button
				onClick={handleNextPage}
				className={styles.arrow}
				disabled={currentPage >= totalPages}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
