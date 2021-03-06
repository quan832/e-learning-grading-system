import { CREATE_QUIZ } from "./../modules/Course/action/manageCourseAction"
import {
  CREATE_LECTURE,
  UPDATE_LECTURE
} from "@/modules/Course/action/manageCourseAction"

export const REGEX_EMAIL =
  "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$"

export const REGEX_PASSWORD =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"

export const TYPE_INPUT = {
  CREATE: "create",
  UPDATE: "update"
}

export const TYPE_QUIZ = {
  MULTIPLE_CHOICE: {
    id: "multipleChoice",
    title: "Multiple Choice"
  }
}

export const TYPE_SELECT_CONTENT_LECTURE = {
  LECTURE: [
    { id: "video", title: "Video", icon: null },
    { id: "videoSlide", title: "Video & Slide Mashup", icon: null },
    { id: "article", title: "Article", icon: null }
  ],
  QUIZ: [
    {
      id: TYPE_QUIZ.MULTIPLE_CHOICE.id,
      title: TYPE_QUIZ.MULTIPLE_CHOICE.title,
      icon: null
    }
  ]
}

export const TYPE_USER = {
  student: "STUDENT",
  teacher: "TEACHER"
}

export const TYPE_LECTURES = {
  // CHAPTER: "SECTION",
  SECTION: "SECTION",
  LECTURE: "LECTURE",
  QUIZ: "QUIZ"
}

export const TYPE_CREATE_COURSE = {
  COURSE: "course",
  TEST: "test"
}

export const TYPE_LECTURE = [
  {
    id: TYPE_LECTURES.LECTURE,
    title: "Lecture",
    titleInput: "New Lecture:",
    submitText: "Add Lecture",
    formField: [{ name: "title", placeHolder: "Enter a title" }],
    contentField: [{ name: "description", placeHolder: "Enter a description" }],
    dispatchAction: CREATE_LECTURE,
    updateAction: UPDATE_LECTURE,
    active: true
  },
  {
    id: TYPE_LECTURES.QUIZ,
    title: "Quiz",
    titleInput: "New Quiz:",
    submitText: "Add Quiz",
    contentField: [{ name: "description", placeHolder: "Enter a description" }],
    formField: [
      { name: "title", placeHolder: "Enter a title" },
      { name: "description", placeHolder: "Quiz description" }
    ],
    dispatchAction: CREATE_QUIZ,
    updateAction: UPDATE_LECTURE,
    active: true
  },
  {
    id: "coding",
    title: "Coding Exercise",
    titleInput: "New Coding Exercise:",
    submitText: "Add Coding Exercise",
    contentField: [{ name: "description", placeHolder: "Enter a description" }],
    formField: [{ name: "title", placeHolder: "Enter a title" }],
    dispatchAction: CREATE_LECTURE,
    updateAction: UPDATE_LECTURE,
    active: true
  },
  {
    id: "practiceTest",
    title: "Practice Test",
    titleInput: "New Practice Test:",
    submitText: "",
    contentField: [{ name: "description", placeHolder: "Enter a description" }],
    formField: [{ name: "title", placeHolder: "Enter a title" }],
    dispatchAction: CREATE_LECTURE,
    updateAction: UPDATE_LECTURE,
    active: false
  },
  {
    id: "assignment",
    title: "Assignment:",
    titleInput: "",
    contentField: [{ name: "description", placeHolder: "Enter a description" }],
    formField: [{ name: "title", placeHolder: "Enter a title" }],
    dispatchAction: CREATE_LECTURE,
    updateAction: UPDATE_LECTURE,
    submitText: "Add Assignment",
    active: true
  }
]

export const TYPE_LECTURE_ID = {
  LECTURE: TYPE_LECTURES.LECTURE,
  QUIZ: TYPE_LECTURES.QUIZ,
  CODING: "coding",
  PRACTICE_TEST: "practiceTest",
  ASSIGNMENT: "assignment"
}

export const OPTIONS_LEVEL = [
  {
    content: "-- Select Level --",
    value: -1
  },
  {
    content: "Beginner Level",
    value: 0
  },
  {
    content: "Intermediate Level",
    value: 1
  },
  {
    content: "Expert Level",
    value: 2
  },
  {
    content: "All levels",
    value: 3
  }
]

export const OPTIONS_CATEGORY = [
  {
    content: "-- Select Category --",
    value: -1
  },
  {
    content: "Development",
    value: 1
  },
  {
    content: "Business",
    value: 2
  },
  {
    content: "Finance & Accounting",
    value: 3
  },
  {
    content: "IT & Software",
    value: 4
  },
  {
    content: "Office Productivity",
    value: 5
  },
  {
    content: "Personal Development",
    value: 6
  },
  {
    content: "Design",
    value: 7
  },
  {
    content: "Marketing",
    value: 8
  },
  {
    content: "Lifestyle",
    value: 9
  },
  {
    content: "Photography & Video",
    value: 10
  },
  {
    content: "Health & Fitness",
    value: 11
  },
  {
    content: "Music",
    value: 12
  },
  {
    content: "Teaching & Academics",
    value: 13
  }
]

export const TypeSection = {
  SECTION: "Section",
  LECTURE: "Lecture"
}
