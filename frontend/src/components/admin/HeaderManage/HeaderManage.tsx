import React from "react"
import { PageHeader, Tag } from "antd"
import { ContainerHeaderManage } from "./HeaderManage.styled"
import { ButtonStyled } from "@/stylesheets/Button/Button.styled"

import { SettingOutlined } from "@ant-design/icons"
import { RootState } from "@/redux/reducer/rootReducer"
import { useDispatch, useSelector } from "react-redux"
import { history } from "@/App/App"
import pathRoute from "@/routes/routePath"
import ManageCourseAction from "@/modules/Course/action/manageCourseAction"

const button = [
  { id: "film&Edit", button: <ButtonStyled /> },
  { id: "curriculum", button: <ButtonStyled /> },
  { id: "captions", button: <ButtonStyled /> },
  {
    id: "courseLandingPage",
    button: (
      <ButtonStyled primary key="save" type="submit" form="form-landing-page">
        Save
      </ButtonStyled>
    )
  },
  { id: "pricing", button: <ButtonStyled /> },
  { id: "promotions", button: <ButtonStyled /> }
]

export default function HeaderManage({ headerExtra }) {
  const buttonExtra = button.find(item => item.id === headerExtra.id)

  const { name: title } = useSelector(
    (state: RootState) => state.create.detail.data
  )

  const dispatch = useDispatch()

  const handleChangeSetting = () => {
    const settingComponent = "settings"
    dispatch(ManageCourseAction.changeSelectedComponent(settingComponent))
  }

  return (
    <ContainerHeaderManage>
      <PageHeader
        className="site-page-header"
        onBack={() => history.push(pathRoute.instructor)}
        title={title}
        subTitle="0min of video content uploaded"
        tags={<Tag color="blue">Draft</Tag>}
        extra={[
          buttonExtra?.button,
          <SettingOutlined onClick={handleChangeSetting} />
        ]}
      ></PageHeader>
    </ContainerHeaderManage>
  )
}
