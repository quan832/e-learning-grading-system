/* eslint-disable consistent-return */
/* eslint-disable no-fallthrough */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import pkg from '@prisma/client';
import { isTeacherEnroll, isTeacherEnrollWithLectureId } from '../../helpers/course/isStudentEnroll.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const getLectureOfCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!await isTeacherEnroll(req, res)) {
      return res.status(403).json({ message: 'you dont have permission to perform this action' });
    }
    const lectures = await prisma.course.findUnique({
      where: {
        id: Number(id),
      },
      select: {

        lectures: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            sort: true,
            quiz: {
              select: {
                id: true,
                title: true,
                createdAt: true,
                sort: true,
              },
            },
            lecturesMaterial: {
              select: {
                id: true,
                title: true,
                sort: true,
                description: true,
                createdAt: true,
                lectureId: true,
              },
            },
          },
        },
      },
    });

    const data = [];

    // sort parent as section in frontend
    lectures.lectures.sort((a, b) => a.sort - b.sort);

    const TYPE_LECTURE = {
      SECTION: 'SECTION',
      LECTURE: 'LECTURE',
      QUIZ: 'QUIZ',
    };

    // get Quiz Array and lectureMaterial array
    const quizzes = [];
    const lectureMaterials = [];
    //   = lectures.lectures.reduce((item) => item.quiz.map((quiz) => ({ ...quiz, _class: TYPE_LECTURE.QUIZ })));
    //  = lectures.lectures.reduce((item) => item.lecturesMaterial.map((lectureMaterial) => ({ ...lectureMaterial, _class: TYPE_LECTURE.LECTURE })));

    lectures.lectures.forEach((item) => {
      item.quiz.forEach((child) => {
        quizzes.push({ ...child, _class: TYPE_LECTURE.QUIZ });
      });

      item.lecturesMaterial.forEach((quiz) => {
        lectureMaterials.push({ ...quiz, _class: TYPE_LECTURE.LECTURE });
      });
    });

    // sort Quiz and lectureMaterial
    const newItem = lectures.lectures.map(({ quiz, lecturesMaterial, ...rest }) => {
      const sortItem = [...lectureMaterials, ...quizzes];
      return { ...rest, itemCurriculum: sortItem.sort((a, b) => a.sort - b.sort) };
    });

    // eslint-disable-next-line array-callback-return
    newItem.map(({ itemCurriculum, ...rest }, index) => {
      data.push({ ...rest, objectIndex: index + 1, _class: TYPE_LECTURE.SECTION });
      for (const item of itemCurriculum) {
        // eslint-disable-next-line no-underscore-dangle
        data.push({
          ...item, objectIndex: index + 1,
        });
      }
    });

    const lengthData = data.length;
    const mappingData = data.map((item, index) => ({ ...item, sortOrder: lengthData - index }));

    return res.status(200).json(mappingData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const createSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!await isTeacherEnroll(req, res)) {
      return res.status(403).json({ message: 'you dont have permission to perform this action' });
    }

    const dataLecture = {
      title,
      description,
      courseId: Number(id),
    };

    // eslint-disable-next-line no-unused-vars
    const lectures = await prisma.lectures.create({
      data: {
        title: dataLecture.title,
        description: dataLecture.description,
        course: {
          connect: {
            id: Number(id),
          },
        },
      },
    });

    return res.status(200).json(lectures);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!await isTeacherEnrollWithLectureId(req, res)) {
      return res.status(403).json({ message: 'you dont have permission to perform this action' });
    }

    const getLecture = await prisma.lectures.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!getLecture) {
      const message = 'Your curriculum item does not exist';
      return res.status(200).json({ message });
    }

    const deleteLectureMaterials = prisma.lecturesMaterial.deleteMany({
      where: {
        lectureId: Number(id),
      },
    });

    const deleteUser = prisma.lectures.delete({
      where: {
        id: Number(id),
      },
    });

    // eslint-disable-next-line no-unused-vars
    const transaction = await prisma.$transaction([deleteLectureMaterials, deleteUser]);

    const message = 'Your curriculum item has been deleted';

    return res.status(200).json({ message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    if (!await isTeacherEnroll(req, res)) {
      return res.status(403).json({ message: 'you dont have permission to perform this action' });
    }

    // eslint-disable-next-line no-shadow
    items.forEach(async (lecture, index) => {
      await prisma.lectures.updateMany({
        where: {
          courseId: Number(id),
          id: Number(lecture.id),
        },
        data: {
          title: lecture.title,
          sort: index,
        },

      });

      lecture.lecturesMaterial.forEach(async (item, indexLecture) => {
        await prisma.lecturesMaterial.update({
          where: {
            id: Number(item.id),
          },
          data: {
            title: item.title,
            sort: indexLecture,
            lecture: {
              connect: {
                id: Number(item.lectureId),
              },
            },
          },
        });
      });
    });

    const message = 'Your curriculum item has been updated';
    return res.status(200).json({ message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const lectures = {
  getLectureOfCourse, createSection, updateSection, deleteSection,
};
