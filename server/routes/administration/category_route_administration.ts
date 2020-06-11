import { Request, Response, NextFunction } from 'express';

/*Роутеры для категорий Администрирования сайта*/
export class CategoryRoute {
  async categoryRoute(app) {
    app.route('api/get-category').get(async (req: Request, res: Response, next: NextFunction) => {

    });

    app.route('api/put-category').put(async (req: Request, res: Response, next: NextFunction) => {

    });
  }

}
