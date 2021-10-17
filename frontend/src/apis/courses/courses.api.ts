import axios, { AxiosResponse } from "axios"

const fetchCourses = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/courses`)
}

const fetchDetailCourse = (params): Promise<AxiosResponse<any>> => {
  return axios.get(`/courses/${params}`)
}

const fetchDetailCourseStatus = (params): Promise<AxiosResponse<any>> => {
  return axios.get(`/courses/${params}/status`)
}

const fetchCoursesEnroll = (): Promise<AxiosResponse<any>> => {
  return axios.get(`/courses/enroll`)
}

const enrollCourse = (courseId, type): Promise<AxiosResponse<any>> => {
  const data = { role: type }
  return axios.post(`/courses/${courseId}/enroll`, data)
}

const courseAPI = {
  fetchCourses,
  fetchDetailCourse,
  fetchCoursesEnroll,
  fetchDetailCourseStatus,
  enrollCourse
}

export default courseAPI
