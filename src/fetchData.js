export default async function fetchData() {
  const nasaIdQueries = [
    "carina_nebula",
    "behemoth-black-hole-found-in-an-unlikely-place_26209716511_o",
    "PIA18033",
    "PIA04921",
    "GSFC_20171208_Archive_e002076",
    "PIA08653",
    "as11-40-5903",
    "GSFC_20171208_Archive_e000383",
    "PIA09579",
    "hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o",
    "PIA12110",
    "GSFC_20171208_Archive_e001435",
  ];

  const promises = nasaIdQueries.map((id) => {
    const url = `https://images-api.nasa.gov/search?nasa_id=${id}&media_type=image`;
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error(res);
      return res.json();
    });
  });

  const resultsArray = await Promise.all(promises);

  return resultsArray.map((result) => {
    const data = result.collection.items["0"];
    return {
      img: data.links["0"].href,
      title: data.data["0"].title,
    };
  });
}
