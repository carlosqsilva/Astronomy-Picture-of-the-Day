import Vue from 'vue'
const bus = new Vue()

const format = (date) => {
	let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    
    if (day < 10) {day = '0'+day}
    if (month < 10) {month = '0'+month}
    
    return year + '-' + month + '-' + day
}

const lastNDays = (number, startDate) => {
	let dates = []
	let date = []

	for(let i = 0; i < number; i++){
		let d = new Date(startDate)
		d.setDate(d.getDate() - i)
		dates.push(format(d))
	}
	return dates
}

export default {
	bus,
	format,
	lastNDays,
}