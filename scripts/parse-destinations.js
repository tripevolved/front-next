const data = [
  {
    image: {
      dimensions: {
        width: 1920,
        height: 1080,
      },
      alt: "vitoria",
      copyright: null,
      url: "https://images.prismic.io/tripevolved/01baf97e-59ad-4947-831a-3cfd32ab8c7e_download.jpeg?auto=compress,format&rect=0,90,2880,1620&w=1920&h=1080",
      md: {
        dimensions: {
          width: 600,
          height: 600,
        },
        alt: null,
        copyright: null,
        url: "https://images.prismic.io/tripevolved/01baf97e-59ad-4947-831a-3cfd32ab8c7e_download.jpeg?auto=compress,format&rect=540,0,1800,1800&w=600&h=600",
      },
      lg: {
        dimensions: {
          width: 800,
          height: 600,
        },
        alt: null,
        copyright: null,
        url: "https://images.prismic.io/tripevolved/01baf97e-59ad-4947-831a-3cfd32ab8c7e_download.jpeg?auto=compress,format&rect=240,0,2400,1800&w=800&h=600",
      },
      xl: {
        dimensions: {
          width: 1400,
          height: 800,
        },
        alt: null,
        copyright: null,
        url: "https://images.prismic.io/tripevolved/01baf97e-59ad-4947-831a-3cfd32ab8c7e_download.jpeg?auto=compress,format&rect=0,76,2880,1646&w=1400&h=800",
      },
    },
  },
];

const result = data.map(({ image }) => {
  const title = image.alt;
  const xxl = { ...image.dimensions, url: image.url, type: "xxl" };
  const xl = { ...image.xl.dimensions, url: image.xl.url, type: "xl" };
  const lg = { ...image.lg.dimensions, url: image.lg.url, type: "lg" };
  const md = { ...image.md.dimensions, url: image.md.url, type: "md" };
  return { title, sources: [xxl, xl, lg, md] };
});

console.log(JSON.stringify(result))
