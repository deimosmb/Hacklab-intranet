import { useEffect } from "react";
import { GetLocationsAPI } from "./../components/Locations/LocationsAPI";
import { useSelector, useDispatch } from "react-redux";
import { allLocations } from "./../actions/LocationActions";

function useLocations() {
  const { data, status } = useSelector((state) => state.LocationsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) {
      GetLocationsAPI(
        (json) => dispatch(allLocations(json)),
        (error) => console.log(error)
      );
    }
  }, [dispatch, status]);

  return data;
}

export default useLocations;
