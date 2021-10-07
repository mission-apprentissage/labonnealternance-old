import { mixin, includes } from "lodash";

mixin({

  // See https://github.com/betagouv/pix/blob/4a008a5aa697dd40b5858a6f0215ab7c40295198/live/app/utils/lodash-custom.js
  isAmongst: function (element, collection) {
    return includes(collection, element);
  }

})

export { mixin }
