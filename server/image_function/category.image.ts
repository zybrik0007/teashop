const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');
import {ErrorValidation} from '../errors/ErrorValidation';

export class ImageCategory {
  async putCategoryImage(id, img): Promise<[boolean, string]> {
    const directory = path.join(__dirname + '../../../../server/image/category/' + id);
    console.log('directory: ', directory);
    try {
      console.log('direct: 1');
      if (!fs.existsSync(directory)) {
        console.log('direct: 2');
        const addDirectory = await fs.mkdirSync(directory);
        console.log('direct: 3');
      }
    } catch (e) {
      console.log('direct: error');
      return [false, ErrorValidation.ErrorImageDirectory];
    }
    if (Object.keys(img).length === 0) {
      console.log('lenth 0');
      return [true, ''];
    } else {
      console.log('lenth no 0 - 1');
      const im = img['image']['path'];
      console.log('lenth no 0 - 2');
      if (img['image']['type'] === 'image/jpeg') {
        try {
          const little = await gm(im)
            .resize(300, 300, '!')
            .write(directory + '/' + 'big.jpg');
        } catch (e) {
          console.log('Ощибка маленькой картинки для категории с id: ', id);
        }
        try {
          const big = await gm(im)
            .resize(190, 190, '!')
            .write(directory + '/' + 'little.jpg');
        } catch (e) {
          console.log('Ощибка большой картинки для категории с id: ', id);
        }
      } else {
        return [false, ErrorValidation.ErrorImageType];
      }
      return [true, ''];
    }
  }
}
