/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable promise/no-callback-in-promise */
import express from 'express';
import pkg from '@prisma/client';
import createHttpError from 'http-errors';
import {
  body, oneOf, param, validationResult,
} from 'express-validator';
import { validate } from '../../validation/validate.js';
import { isAuth } from '../../middleware/auth.js';
import { getDecodedToken } from '../../helpers/auth.helper.js';
import { coursesController } from '../../controller/course/course.js';

const router = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function getCourses() {
  const courses = await prisma.course.findMany();
  return courses;
}

async function getCourseById(id) {
  const courseById = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      members: {
        select: {
          role: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              social: true,
            },
          },
        },
        // include: {
        //   // role: true,
        //   user: true,
        // },
        // where: {
        //   role: 'TEACHER',
        // },
      },
    },
  });

  const author = courseById.members.filter((item) => { if (item.role === 'TEACHER') return true; }).map((item) => ({ ...item.user }));
  const totalStudents = courseById.members.filter((item) => { if (item.role === 'STUDENT') return true; }).reduce((acc) => acc + 1, 0);

  const { members, ...data } = courseById;
  return { ...data, author, totalStudents };
}

async function createCourse(name, courseDetails, userId) {
  // when creating a course make the authenticated user a teacher of the course
  const createdCourse = await prisma.course.create({
    data: {
      name,
      courseDetails,
      // members: {
      //   create: {
      //     role: 'TEACHER',
      //     user: {
      //       connect: {
      //         id: userId,
      //       },
      //     },
      //   },
      // },
    },
  });

  return createdCourse;
}

async function deleteCourse(id) {
  // Delete all enrollments
  const deletedCourse = await prisma.$transaction([
    prisma.courseEnrollment.deleteMany({
      where: {
        courseId: Number(id),
      },
    }),
    prisma.course.delete({
      where: {
        id: Number(id),
      },
    }),
  ]);

  return deletedCourse;
}

async function updateCourse(name, courseDetails, id) {
  // update course
  const updatedCourse = await prisma.course.update({
    where: { id: Number(id) },
    data: {
      name,
      courseDetails,
    },
  });

  return updatedCourse;
}

async function getCourseStatus(req) {
  const { id } = req.params;
  const token = await getDecodedToken(req);

  const courseById = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      favoriteCourse: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      members: {
        select: {
          role: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              social: true,
            },
          },
        },
        // include: {
        //   // role: true,
        //   user: true,
        // },
        // where: {
        //   role: 'TEACHER',
        // },
      },
    },
  });

  const members = courseById.members.map((user) => user.user);
  const userEnroll = members.some((user) => user.email === token.email);
  const favorite = courseById.favoriteCourse.some((user) => user.user.email === token.email);
  return { userEnroll, favorite };
}

// GET courses
router.get('/', (req, res, next) => getCourses().then((courses) => res.json(courses)).catch((error) => {
  // 500 (Internal Server Error) - Something has gone wrong in your application.
  const httpError = createHttpError(500, error);
  next(httpError);
}));

router.get('/enroll', isAuth, (req, res) => coursesController.getEnrollCourses(req, res));

// GET courses by id
router.get('/:id', validate([
  param('id')
    .isNumeric()
    .withMessage('Id is not a number'),
]), (req, res, next) => getCourseById(req.params.id)
  .then((courseById) => res.json(courseById))
  .catch((error) => {
  // 500 (Internal Server Error) - Something has gone wrong in your application.
    const httpError = createHttpError(500, error);
    next(httpError);
  }));

router.get('/:id/status', isAuth, validate([
  param('id')
    .isNumeric()
    .withMessage('Id is not a number'),
]), (req, res, next) => getCourseStatus(req)
  .then((data) => res.json(data))
  .catch((error) => {
  // 500 (Internal Server Error) - Something has gone wrong in your application.
    const httpError = createHttpError(500, error);
    next(httpError);
  }));

// POST courses
router.post('/', validate([
  body('name')
    .notEmpty()
    .withMessage('name can not be empty'),
  body('courseDetails')
    .notEmpty()
    .withMessage('course detail can not be empty')
    .bail()
    .isLength({ min: 20 })
    .withMessage('course detail must be at least 20 characters'),
]), (req, res, next) => {
  const { name, courseDetails } = req.body;

  createCourse(name, courseDetails)
    .then((createdCourse) => res.json(createdCourse))
    .catch((error) => {
      // 500 (Internal Server Error) - Something has gone wrong in your application.
      const httpError = createHttpError(500, error);
      next(httpError);
    });
});

// PUT course
router.put('/:id', validate([
  param('id')
    .isNumeric()
    .withMessage('Id is not a number'),
  oneOf([
    body('name')
      .notEmpty()
      .withMessage('name can not be empty'),
    body('courseDetails')
      .notEmpty()
      .withMessage('course detail can not be empty')
      .isLength({ min: 20 })
      .withMessage('course detail must be at least 20 characters'),
  ]),
]), (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    // Oh noes. This user doesn't have enough skills for this...
    res.status(400).json({ message: err.message });
  }
  const { name, courseDetails } = req.body;
  const { id } = req.params;

  updateCourse(name, courseDetails, id)
    .then((updatedCourse) => res.json(updatedCourse))
    .catch((error) => {
    // 500 (Internal Server Error) - Something has gone wrong in your application.
      const httpError = createHttpError(500, error);
      next(httpError);
    });
});

router.delete('/:id', validate([
  param('id')
    .isNumeric()
    .withMessage('Id is not a number')]),
(req, res, next) => {
  const { id } = req.params;

  // delete course
  deleteCourse(id).then((deletedCourse) => res.json({ message: 'delete succesfully' }))
    .catch((error) => {
    // 500 (Internal Server Error) - Something has gone wrong in your application.
      const httpError = createHttpError(500, error);
      next(httpError);
    });
});

export default router;
