import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import actions from "../../action/index"
import CourseItem from "../CourseItem/CourseItem"

import "@@/node_modules/slick-carousel/slick/slick.css"
import "@@/node_modules/slick-carousel/slick/slick-theme.css"

import Slider from "react-slick"

import CourseSliderStyled from "./CourseSlider.styled"

/** next arrow để styled */
function NextArrow(props) {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  )
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <NextArrow />
}

export default function CourseSlider() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.FETCH_COURSES_DATA.REQUEST })
  }, [dispatch])

  const { data } = useSelector((state: any) => state.dashboard.courses)

  const renderCourses = () => {
    return data?.map((item, index) => (
      <div key={index}>
        <CourseItem
          name={item.name}
          firstName={item.firstName}
          lastName={item.lastName}
          id={item.id}
        />
      </div>
    ))
  }

  return (
    <CourseSliderStyled>
      <Slider {...settings}>{renderCourses()}</Slider>
    </CourseSliderStyled>
  )
}
