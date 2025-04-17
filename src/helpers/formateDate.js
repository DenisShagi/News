export const formatDate = date => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}

export const formatTimeAgo = dateInput => {
	const now = new Date()
	const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
	const secondsPast = (now.getTime() - date.getTime()) / 1000

	if (secondsPast < 60) {
		return `${Math.floor(secondsPast)}s ago`
	}
	if (secondsPast < 3600) {
		return `${Math.floor(secondsPast / 60)}m ago`
	}
	if (secondsPast < 86400) {
		return `${Math.floor(secondsPast / 3600)}h ago`
	}
	const days = Math.floor(secondsPast / 86400)
	return days === 1 ? `1 day ago` : `${days} days ago`
}
