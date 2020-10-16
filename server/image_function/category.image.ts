const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');
import {ErrorValidation} from '../errors/ErrorValidation';

export class ImageCategory {
  async putCategoryImage(id, img) {
    const directory = path.join(__dirname + '../../../../server/image/category/' + id);
    const addDirectory = (direct) => {

      return new Promise((resolve, reject) => {
        fs.mkdir(direct, {recursive: true}, err => {
          if (err) {
            console.log('Ошибка добавления директории для категориии с id: ', id);
            resolve();
          } else {
            resolve();
          }
        });
      });
    };

    const little = (image, str) => {
      console.log('Функция добавления маленькой картинки');
      return new Promise((resolve, reject) => {
        gm(image)
          .resize(190, 190, '!')
          .write(str + '/' + 'little.jpg', err => {
            if (err) {
              console.log('Ошибка добавления маленькой картинки для категории с id: ', id);
              resolve();
            } else {
              resolve();
            }
          });
      });
    };

    const big = (image, str) => {
      return new Promise((resolve, reject) => {
        console.log('Промис большой картинки');
        gm(image)
          .resize(300, 300, '!')
          .write(str + '/' + 'big.jpg', err => {
            if (err) {
              console.log('Ошибка добавления большой картинки для категории с id: ', id);
              resolve();
            } else {
              resolve();
            }
          });
      });
    };

    if (Object.keys(img).length === 0) {
      const directOnly = await addDirectory(directory);
      return [true, ''];
    } else {
      if (img['image']['type'] === 'image/jpeg') {
        const im = img['image']['path'];
        const directAwait = await addDirectory(directory);
        const bigAwait = await big(im, directory);
        const littleAwait = await little(im, directory);
        return [true, ''];
      } else {
        console.log('Ошибка формата картинки, при добавлении для категории с id: ', id);
      }

    }
  }
}
