export const handleSelection = (
  currentCop,
  vehicleInfo,
  cities,
  copSelections
) => {
  const currentCopInfo = copSelections.find(
    (cop) => cop.copName === currentCop
  );
  console.log("currentCopInfo : ", copSelections, currentCopInfo);
  const cityData = cities.find((c) => c.name === currentCopInfo.city);

  if (!canVehicleMakeRoundTrip(cityData.distance, vehicleInfo.range)) {
    return {
      status: false,
      message: `You can only select a vehicle which can have a round trip`,
    };
  }

  const vehicleCheck = isVehicleAlreadySelected(vehicleInfo, copSelections);
  if (!vehicleCheck.status) {
    return vehicleCheck;
  }

  // copSelections.push({ copName, vehicle: vehicleKind });
  return { status: true };
};
const canVehicleMakeRoundTrip = (cityDistance, vehicleRange) => {
  return vehicleRange >= cityDistance * 2;
};

//  check already selected vehicle and handle edge cases
const isVehicleAlreadySelected = (vehicleInfo, copSelections) => {
  const selectedCops = copSelections.filter(
    (cop) => cop.vehicle === vehicleInfo.kind
  );

  if (selectedCops.length >= vehicleInfo.count) {
    const copNames = selectedCops.map((cop) => cop.copName).join(", ");
    return {
      status: false,
      message: `The vehicle is already used by the following cop(s): ${copNames}`,
    };
  }

  return { status: true };
};
