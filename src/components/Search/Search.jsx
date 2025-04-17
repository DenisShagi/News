import styles from './styles.module.css'

const Search = ({ keyWords, setKeyWords }) => {
	return (
		<div className={styles.Search}>
			<input
				type='text'
				value={keyWords}
				className={styles.input}
				onChange={e => setKeyWords(e.target.value)}
				placeholder='Search...'
			/>
		</div>
	)
}

export default Search
