import styled from "styled-components"

export const LectureStyled = styled.div`
  position: relative;
  padding: 0 10px 0px 60px;
  // background-color: #f7f9fa;
  // border: 1px solid #6a6f73;
  // // border-top-color: transparent;
  // margin-top: -2px;

  .ant-collapse {
    border: 1px solid #6a6f73;
    background-color: #fff !important;
  }
  .ant-collapse-content {
    border-top: 1px solid #6a6f73 !important;
    background-color: #fff !important;
  }

  .ant-collapse-header {
    display: flex;
    align-items: center;
    padding: 10px 16px !important;
    padding-right: 40px !important;
    padding-left: 5px !important;
  }

  .ant-collapse-content-box {
    position: relative;
  }
`

export const HeaderPanelStyled = styled.div`
  width: 100%;

  &:hover {
    .editDeleteLectureGroup {
      opacity: 1;
      transition: all 500ms;
    }
  }

  .editDeleteLectureGroup {
    opacity: 0;
    font-size: 10px;
  }
`
