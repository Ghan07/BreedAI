const cattleBreeds = ['Holstein Friesian', 'Jersey', 'Angus', 'Hereford', 'Brahman', 'Sahiwal', 'Gir', 'Red Sindhi', 'Tharparkar', 'Ongole'];
const buffaloBreeds = ['Murrah', 'Nili-Ravi', 'Surti', 'Mehsana', 'Jaffarabadi', 'Bhadawari', 'Nagpuri', 'Pandharpuri', 'Toda', 'Marathwadi'];

const rand = (min, max, decimals = 1) => {
  const val = Math.random() * (max - min) + min;
  return Number(val.toFixed(decimals));
};

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getBCSCategory = (score) => {
  if (score <= 2) return 'emaciated';
  if (score <= 4) return 'thin';
  if (score <= 6) return 'moderate';
  if (score <= 7.5) return 'good';
  return 'obese';
};

const generateOverlayDescription = (measurements, animalType) => {
  return `Morphometric overlay analysis complete. Side-view profile captured with ${animalType} specimen. ` +
    `Key landmark points identified: poll, withers, hooks, pins, tail-head, brisket, and hoof line. ` +
    `Body length measured from point of shoulder to pin bone: ${measurements.bodyLength}cm. ` +
    `Heart girth circumference at deepest chest point: ${measurements.heartGirth}cm. ` +
    `Height at withers from ground to highest point of shoulder: ${measurements.heightAtWithers}cm. ` +
    `Hip width between outer hook bones: ${measurements.hipWidth}cm. ` +
    `Skeletal frame analysis indicates ${measurements.bodyConditionScore > 5 ? 'well-conditioned' : 'moderate'} musculature ` +
    `with ${measurements.bodyConditionScore > 6 ? 'adequate' : 'limited'} subcutaneous fat deposits visible in the rib and loin areas. ` +
    `Pin bone and hook bone prominence: ${measurements.bodyConditionScore < 4 ? 'clearly visible' : 'moderately covered'}. ` +
    `Tail-head fat deposits: ${measurements.bodyConditionScore > 6 ? 'filled' : 'partially visible'}.`;
};

export const classifyAnimal = async (imageInfo) => {
  // Simulate processing delay
  const processingTime = rand(1200, 3500, 0);
  await new Promise(resolve => setTimeout(resolve, Math.min(processingTime, 2000)));

  const isCattle = Math.random() > 0.45;
  const animalType = isCattle ? 'cattle' : 'buffalo';
  const breeds = isCattle ? cattleBreeds : buffaloBreeds;
  const primaryBreed = pickRandom(breeds);
  let secondaryBreed = pickRandom(breeds.filter(b => b !== primaryBreed));
  const primaryConfidence = rand(0.72, 0.98, 3);
  const secondaryConfidence = rand(0.05, 1 - primaryConfidence - 0.05, 3);

  const measurements = {
    bodyLength: rand(isCattle ? 130 : 140, isCattle ? 180 : 195),
    heartGirth: rand(isCattle ? 155 : 170, isCattle ? 210 : 230),
    heightAtWithers: rand(isCattle ? 110 : 120, isCattle ? 150 : 160),
    hipWidth: rand(isCattle ? 38 : 42, isCattle ? 58 : 65),
    bodyConditionScore: rand(2.5, 8.5),
  };

  const atcScore = rand(55, 97);

  const atcResult = {
    animalType,
    breedPrediction: primaryBreed,
    confidence: primaryConfidence,
    secondaryBreed,
    secondaryConfidence,
    atcScore,
    bodyConditionCategory: getBCSCategory(measurements.bodyConditionScore),
    overlayDescription: generateOverlayDescription(measurements, animalType),
  };

  return { measurements, atcResult, processingTime };
};
