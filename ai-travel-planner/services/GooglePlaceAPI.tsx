export const GetPhotoRef = async (placeName: string) => {
    const resp = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?' +
      'query=' + placeName +
      '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);
  
    const result = await resp.json();
    console.log(result);
    return result;
  };
  