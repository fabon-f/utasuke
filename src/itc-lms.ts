function extractTimetable() {
    const timetable = document.querySelector("#timetable #selectTimetable > .divTable");
    if (timetable === null) { throw new Error("時間割の取得に失敗しました"); }
    const ttRows = Array.from(timetable.querySelectorAll(".divTableBody > .divTableRow.data"));
    if (ttRows.length !== 7) { throw new Error("時間割の取得に失敗しました"); }

    const tt = ttRows.map(row => Array.from(row.querySelectorAll(".divTableCell")));
    const res = tt.every(cells => {
        if (cells.length !== 6) { return false; }
        if (!cells.every((cell, index) => cell.classList.contains(`${index + 1}_yobicol`))) {
            return false;
        }
        return true;
    });
    if (!res) { throw new Error("時間割の取得に失敗しました"); }

    const details = tt.map(row => row.map(element => {
        if (element.textContent?.trim() === "") { return null; }
        const header = element.querySelector(".divTableCellHeader");
        if (header === null) { throw new Error("時間割の取得に失敗しました"); }
        const courseID = header.id;
        const courseName = header.textContent?.trim();
        if (courseName === undefined) { throw new Error("時間割の取得に失敗しました"); }
        const teacherElements = element.querySelectorAll(".divTableCellTeacher");
        const teachers = Array.from(teacherElements).map(e => e.textContent).join("").trim();
        const temporary = element.querySelectorAll(".enrolTemp_icon").length != 0;
        return { courseID, courseName, teachers, temporary };
    }));

    return details[0].map((_, i) => details.map(row => row[i]));
}

if (location.pathname === "/lms/timetable") { console.log(extractTimetable()); }
