import { RootState } from "@/redux/reducer/rootReducer"
import React from "react"
import { useSelector } from "react-redux"
import DraftCourse from "../DraftCourse/DraftCourse"

export default function DraftCourseList() {
  const { data } = useSelector(
    (state: RootState) => state.course.instructorCourse
  )

  const renderDraftCourse = () => {
    return data.map(course => (
      <DraftCourse
        id={course.id}
        title={course.name}
        isPublic={course.isPublic}
      />
    ))
  }

  return <>{renderDraftCourse()}</>
}
