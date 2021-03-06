/* eslint-disable jsx-a11y/anchor-is-valid */
import { FlexItemStyled } from "@/stylesheets/Div/Div.styled"
import { Col, Row } from "antd"
import React from "react"
import {
  CourseCardImageStyled,
  CourseDraftItemStyled,
  CourseProgressStyled,
  HoverDraftCourse
} from "../DraftCourseList/DraftCourseList.styled"

export default function DraftCourse({ id, title, isPublic }) {
  const renderDraftPublish = () => {
    if (isPublic)
      return (
        <p className="font-size-12 mb-0">
          <span className="text-fade">Draft</span>{" "}
          <span className="font-weight-500">Public</span>
        </p>
      )
    else {
      return (
        <p className="font-size-12 mb-0">
          <span className="font-weight-500">Draft</span>{" "}
          <span className="text-fade">Public</span>
        </p>
      )
    }
  }

  return (
    <Row>
      <Col span={12}>
        <CourseDraftItemStyled flex>
          <div className="box pull-up">
            <div className="box-body">
              <FlexItemStyled>
                <CourseCardImageStyled>
                  <img
                    alt=""
                    width="118"
                    height="118"
                    src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
                  ></img>
                </CourseCardImageStyled>
                <FlexItemStyled
                  className="body-course-draft
"
                >
                  <div className="d-flex align-items-center">
                    {/* <div className="icon bg-primary-light rounded-circle w-60 h-60 text-center l-h-80">
                <span className="font-size-30 icon-Bulb1">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                  <span className="path4" />
                </span>
              </div> */}
                    <div className="ml-15">
                      <h5 className="mb-0">{title}</h5>
                      <div>{renderDraftPublish()}</div>
                    </div>
                  </div>
                </FlexItemStyled>
              </FlexItemStyled>
              <CourseProgressStyled className="body-course-draft">
                <p className="text-fade font-size-12 mb-0">
                  Finish your course
                </p>

                <div className="courses--course-progress--C_Gvp udlite-meter-wrapper meter--meter-wrapper--R6ZCR">
                  <div
                    className="udlite-meter meter--meter--27-bB"
                    aria-label="0% complete"
                    data-purpose="meter"
                    style={{ transform: "scaleX(0.65)" }}
                  />
                </div>
              </CourseProgressStyled>
              {/* <NavLink to={`/instructor/course/${id}/manage`}> */}
              <HoverDraftCourse
                to={`/course/${id}/manage`}
                className="edit-manage-course"
              >
                Edit / manage course
              </HoverDraftCourse>
              {/* </NavLink> */}
            </div>
          </div>
        </CourseDraftItemStyled>
      </Col>
    </Row>
  )
}
