import StudentList from './StudentList'
import StudentNew from './StudentNew'

function StudentIndex() {
  return (
    <>
      <div className="flex my-4">
        <StudentNew />
      </div>
      <StudentList />
    </>
  )
}

export default StudentIndex