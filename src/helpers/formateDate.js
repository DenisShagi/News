export const formatDate = date => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}

export const formatTimeAgo = (dateString) => {
	const now = new Date()
	const date = new Date(dateString)
	const secondPast = (now.getTime()) - (date.getTime()) / 1000

	if(secondPast < 60){
		return `${Math.floor(secondPast)}s ago`
	}
	if (secondPast < 3600) {
		return `${Math.floor(secondPast)}m ago`
	}
	if (secondPast <= 86400) {
		return `${Math.floor(secondPast)}h ago`
	}
	if (secondPast > 86400) {
		const day = Math.floor(secondPast / 86400)  
		return day === 1 ? `${day} day ago` : `${day} day's ago`
	}
}