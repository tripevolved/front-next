const axios = require("axios");

const ref = "ZLZ7nBIAACIAh1VS";
const JSON_DESTINATIONS = `https://tripevolved.cdn.prismic.io/api/v2/documents/search?ref=${ref}&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22ZE-x1xAAACkA4MxL%22%29+%5D%5D`;

const search = "campo-grande";

const parse = (data) =>
  data.map(({ image }) => {
    const title = image.alt;
    const xxl = { ...image.dimensions, url: image.url, type: "xxl" };
    const xl = { ...image.xl.dimensions, url: image.xl.url, type: "xl" };
    const lg = { ...image.lg.dimensions, url: image.lg.url, type: "lg" };
    const md = { ...image.md.dimensions, url: image.md.url, type: "md" };
    return { title, sources: [xxl, xl, lg, md] };
  });

const main = async () => {
  const { data } = await axios(JSON_DESTINATIONS);
  const photos = data.results[0].data.photos;
  const photo = photos.find(({ image }) => image.alt === search);
  const result = parse([photo]);
  console.log(JSON.stringify(result));
};

main();
