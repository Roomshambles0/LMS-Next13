# Learning Management System

## Overview

The Learning Management System (LMS) is a robust web application designed to facilitate the management of courses for both students and teachers. It empowers students to easily browse, purchase, and engage with courses, while providing teachers with comprehensive analytics to track course performance.

## Features

### For Students:

- **Browse Courses:** Explore a diverse range of courses available on the platform.
- **Purchase Courses:** Seamlessly purchase and enroll in courses of interest.
- **User Dashboard:** Access a personalized dashboard with an overview of enrolled courses.

### For Teachers:

- **Create Courses:** Effortlessly create and manage courses to share knowledge.
- **Analytics Dashboard:** Gain insights into overall course purchase details, student engagement, and performance metrics.

## Technologies Used

- **TypeScript:** The entire project is developed using TypeScript to ensure a statically-typed and more maintainable codebase.
- **Next.js:** A React framework that enables server-side rendering and efficient routing, providing a fast and optimized user experience.
- **Prisma:** A modern database toolkit for TypeScript and Node.js that simplifies database interactions and migrations.
- **Tailwind CSS:** A utility-first CSS framework that facilitates rapid UI development with a focus on simplicity and flexibility.
- **Shadcnui:** A library for creating beautiful and customizable shadows in the user interface.
- **Uploadthing:** Upload thumbnails, attachments and videos using UploadThing
- **MUX:** HLS Video player and Video processing using Mux
- **next auth:** Authentication 
- **PostgreSQL:** PostgreSQL database integration using Neon.

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Roomshambles0/LMS-Next13.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXTAUTH_SECRET=
NEXT_GITHUB_CLIENT_ID=
NEXT_GITHUB_CLIENT_SECRET=
NEXT_AUTH_URL=

DATABASE_URL=

UPLOADTHING_SECRET=

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

STRIPE_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=


```

### Setup Prisma

Add postgresql Database 

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |


## Future Enhancements

- [ ] Add settings section where student or teacher can edit their profile info.
- [ ] Integreate live google meet like functionality.
- [ ] Payment gateway modifications.
- [ ] email functionality when new chapter is released in the course.
- [ ] ... (Add more future enhancements)


## Acknowledgments

- Special thanks to the open-source community and the authors of the libraries used in this project.

Happy learning! 🚀