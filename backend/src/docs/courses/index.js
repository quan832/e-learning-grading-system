/* eslint-disable import/extensions */
import getCourses from './get-courses.js';

const pathCourses = {
  '/courses': {
    ...getCourses,
  },
};

export default pathCourses;
