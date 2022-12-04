function getCoursesDataObject(base_table_element) {

}

let data_table = document.getElementsByTagName("table")[0];

let tbody = data_table.children[1];

const convertTime12to24 = (time12h) => {
	const [time, modifier] = time12h.split(' ');

	let [hours, minutes] = time.split(':');

	if (hours === '12') {
		hours = '00';
	}

	if (modifier === 'PM') {
		hours = parseInt(hours, 10) + 12;
	}

	return `${hours}:${minutes}`;
}

data = []
currentCourse = {}

headers = [
	"id",
	"course",
	"area",
	"department",
	"credits",
	"hrs_per_week",
]


let isFirstPart = true;

for (let i = 0; i < tbody.children.length; i++) {
	if (isFirstPart) {

		let base = tbody.children[i].children;

		for (let h = 0; h < headers.length - 2; h++) {
			currentCourse[headers[h]] = base[h].children[1].innerHTML
		}
		for (let h = headers.length - 2; h < headers.length; h++) {
			currentCourse[headers[h]] = parseInt(base[h].children[1].innerHTML)
		}


		isFirstPart = false;
	} else {

		let base = tbody.children[i].children[0].children[0].children[0];


		let description = base.children[0]
		let course_description = description.innerHTML.split("<br>")[1].trim().replace(/\n/g, ' ').trim();
		course_description = course_description.replace(/[^\S\r\n]{2,}/g, " ").trim()
		currentCourse["description"] = course_description

		let courses = base.children[2]

		courses_list = []

		for (let c = 0; c < courses.children.length; c++) { //courses.children.length
			course = {}
			course["id"] = courses.children[c].children[0].children[0].children[1].innerHTML.split(": ")[1].trim()

			base_element = courses.children[c].children[1].children[0]

			let extractor = ""
			course["profesor"] = base_element.children[0].children[1].innerHTML.trim().replace(/\n/g, ' ').trim().replace(/[^\S\r\n]{2,}/g, " ").trim()
			let sesiones = []


			try {

				let sesion1 = {}
				sesion1["room"] = base_element.children[2].children[1].innerHTML
				let horario = base_element.children[3].children[1].innerHTML.trim().replace(/\n/g, ' ').trim().replace(/[^\S\r\n]{2,}/g, " ").trim()

				let schedule1 = {
					"day": horario.split(" ")[0],
					"start": convertTime12to24(horario.split(" ")[2] + " " + horario.split(" ")[3]),
					"end": convertTime12to24(horario.split(" ")[5] + " " + horario.split(" ")[6])
				}
				sesion1["schedule"] = schedule1
				sesiones.push(sesion1)
			} catch (error) {

			}

			try {

				let sesion2 = {}
				sesion2["room"] = base_element.children[6].children[1].innerHTML
				horario = base_element.children[7].children[1].innerHTML.trim().replace(/\n/g, ' ').trim().replace(/[^\S\r\n]{2,}/g, " ").trim()

				let schedule2 = {
					"day": horario.split(" ")[0],
					"start": convertTime12to24(horario.split(" ")[2] + " " + horario.split(" ")[3]),
					"end": convertTime12to24(horario.split(" ")[5] + " " + horario.split(" ")[6])
				}
				sesion2["schedule"] = schedule2
				sesiones.push(sesion2)
			} catch (error) {

			}


			course["sesions"] = sesiones
			courses_list.push(course)
		}
		currentCourse["goups"] = courses_list;

		isFirstPart = true;
		data.push(currentCourse);
		currentCourse = {}
	}
}

function download(content, fileName, contentType) {
	var a = document.createElement("a");
	var file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}
console.log(JSON.stringify(data, null, 2))
download(JSON.stringify(data, null, 2), 'data.json', 'text/json');