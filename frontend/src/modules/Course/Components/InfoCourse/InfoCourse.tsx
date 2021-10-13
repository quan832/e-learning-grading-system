/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconStyled } from "@/stylesheets/Icon/Icon.styled"
import { ButtonStyled } from "@/stylesheets/Button/Button.styled"
import React from "react"

import {
  HeartOutlined,
  AppstoreAddOutlined,
  StarOutlined
} from "@ant-design/icons"

export default function InfoCourse() {
  return (
    <div className="col-md-8 col-sm-6">
      <h2 className="box-title mt-0">Typescript basic</h2>
      <div className="list-inline">
        <IconStyled star>
          <StarOutlined />
        </IconStyled>
        <IconStyled star>
          <StarOutlined />
        </IconStyled>
        <IconStyled star>
          <StarOutlined />
        </IconStyled>
        <IconStyled star>
          <StarOutlined />
        </IconStyled>
        <IconStyled star>
          <StarOutlined />
        </IconStyled>
      </div>
      {/* <h1 className="pro-price mb-0 mt-20">
        $270
        <span className="old-price">$540</span>
        <span className="text-danger">50% off</span>
      </h1> */}
      <hr />
      <p>
        Lorem Ipsum available, but the majority have suffered alteration in some
        form, by injected humour, or randomised words which don't look even
        slightly believable. but the majority have suffered alteration in some
        form, by injected humour
      </p>
      <hr />
      <div className="gap-items">
        <ButtonStyled success>
          <IconStyled>
            <AppstoreAddOutlined />
          </IconStyled>
          Enroll Course
        </ButtonStyled>
        <ButtonStyled danger>
          <IconStyled>
            <HeartOutlined />
          </IconStyled>
          Wishlist
        </ButtonStyled>
      </div>
      <h4 className="box-title mt-20">Key Highlights</h4>
      <ul className="list-icons">
        <li>
          <i className="fa fa-check text-danger float-none" /> Party Wear
        </li>
        <li>
          <i className="fa fa-check text-danger float-none" /> Nam libero
          tempore, cum soluta nobis est
        </li>
        <li>
          <i className="fa fa-check text-danger float-none" /> Omnis voluptas as
          placeat facere possimus omnis voluptas.
        </li>
      </ul>
    </div>
  )
}
