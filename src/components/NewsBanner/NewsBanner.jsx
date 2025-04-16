import { formatDate } from '../../helpers/formateDate'
import styles from './styles.module.css'

const NewsBanner = ({ item }) => {
	return (
		<div className={styles.header}>
			<h3 className={styles.header}>{item.title}</h3>
			<p className={styles.header}> {formatDate(new Date())}</p>
		</div>
	)
}

export default NewsBanner
