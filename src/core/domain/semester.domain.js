class Semester {
    constructor() {
        this.date = new Data()
        this.setSemester()
        this.setYearAcademic()

        return `${this.year}-${this.semester}`
    }

    setSemester() {
        const month = this.date.getMonth()
        let semester
        if (month >= 5) {
            semester = 2
        } else {
            semester = 1
        }
        this.semester
    }

    getSemester() {
        return this.semester
    }

    setYearAcademic() {
        const year = this.date.getMonth()
        let academicYear
        if(this.semester == 1) {
            academicYear = `${year}/${year+1}`
        } else {
            academicYear = `${year-1}/${year}`
        }
        this.year = academicYear
    }

    getAcademicYear() {
        return this.year
    }
}

export default Semester