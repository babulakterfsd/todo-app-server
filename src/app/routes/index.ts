import { Router } from 'express';
import { TodoRoutes } from '../modules/todo/todo.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/todos',
    route: TodoRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
