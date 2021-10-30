const createLectureMaterial = {
  post: {
    tags: ['Lectures Material'],
    description: 'create lecture material',
    operationId: 'createLectureMaterial',
    security: [
      { bearerAuth: [] },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Title of section',
                example: 'How to play a piano',
              },
            },
          },
        },
      },
    },
    parameters: [
      // expected params.
      {
        name: 'id', // name of the param
        in: 'path', // location of the param
        schema: {
          $ref: '#/components/schemas/id', // data model of the param
        },
        required: true, // Mandatory param
        description: 'A single course id', // param desc.
      },
    ],
    // expected responses
    responses: {
      200: {
        description: 'Lectures were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Lectures',
            },
          },
        },
      },
      404: {
        description: 'Courses is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },

};

export default createLectureMaterial;
