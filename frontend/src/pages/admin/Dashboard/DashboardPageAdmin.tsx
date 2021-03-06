import { history } from "@/App/App"
import { useRouter } from "@/hooks/useRouter"
import CreateCourseCarousel from "@/modules/Course/Components/Admin/CreateCourse/CreateCourseCarousel"
import DraftCourseContainer from "@/modules/Course/Container/Admin/DraftCourseContainer/DraftCourseContainer"
import pathRoute from "@/routes/routePath"
import { PageContentStyled } from "@/stylesheets/Page/Page.styled"
import React, { useEffect } from "react"

export default function DashboardPageAdmin() {
  const router = useRouter()

  const { pathname } = router.location

  useEffect(() => {
    if (pathname === pathRoute.instructor) {
      history.push(pathRoute.instructorCourse)
    }
  }, [pathname])

  return (
    <PageContentStyled>
      <CreateCourseCarousel />
      <DraftCourseContainer />
    </PageContentStyled>
  )
}
