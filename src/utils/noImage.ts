export const noImage = (() => {
  const base = 'https://pyxis-heroku.herokuapp.com/t/q';
  return {
    female: `${base}/ks23zkdsiw32f.jpg`,
    male: `${base}/ks23zkdsiw32m.jpg`,
    collection: `${base}/collection.jpg`,
    watchList: `${base}/img_watch.jpg`,
    liked: `${base}/img_like_green.jpg`,
    default: `${base}/aq23lxze82dsa.jpg`,
    default_lg: `${base}/aq23lxze82dsalg.jpg`,
  };
})();
