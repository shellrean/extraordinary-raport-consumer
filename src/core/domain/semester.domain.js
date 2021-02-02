class Semester {
    constructor() {
        this.date = new Date()
        this.setSemester()
        this.setYearAcademic()
    }

    getFormat() {
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
        this.semester = semester
    }

    getSemester() {
        return this.semester
    }

    setYearAcademic() {
        const year = this.date.getFullYear()
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