const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');
import {ErrorValidation} from '../errors/ErrorValidation';

export class ImageCategory {
  async putCategoryImage(id, img): Promise<[boolean, string]> {
    const directory = path.join(__dirname + '../../../../server/image/category/' + id);
    console.log('directory: ', directory);
    const im = img.files['image']['path'];
    try {
      fs.mkdirSync(directory);
    } catch (e) {
      return [false, ErrorValidation.ErrorImageDirectory];
    }
    if (Object.keys(img).length === 0) {
      return [true, ''];
    } else {
      if (img['image']['type'] === 'image/jpeg') {
        gm(im)
          .resize(300, 300, '!')
          .write(directory + '/' + 'big.jpg', (err) => {
            if (err) {
              return [false, ErrorValidation.ErrorImageBig];
            } else {
              return [true, ''];
            }
          });
        gm(im)
          .resize(190, 190, '!')
          .write(directory + '/' + 'little.jpg', (err) => {
            if (err) {
              return [false, ErrorValidation.ErrorImageLittle];
            } else {
              return [true, ''];
            }
          });
      } else {
        return [false, ErrorValidation.ErrorImageType];
      }
    }

  }
}
