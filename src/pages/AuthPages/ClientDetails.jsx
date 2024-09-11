import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../AuthComponents/Nav";
import { getIndividualClient } from "@/Features/Client/Client";
import { useDispatch, useSelector } from "react-redux";
const ClientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { client, loading_client, error } = useSelector(
    (state) => state.getindividual
  );
  React.useEffect(() => {
    dispatch(getIndividualClient(id));
  }, [dispatch]);

  return (
    <div>
      <div className="">
        <Nav />
        <div className="w-full bg-gray-100 h-96">
          <div className="m-auto w-[1200px] ">
            <div className="text-4xl pt-52 font-bold">
              {loading_client ? "loading..." : client.ClientName}
              <br />
              <p className="text-sm font-light">{client.ClientDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
