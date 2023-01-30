import { GetServerSideProps } from "next";
import network from "@/services/network";


export default function() {
  return (
    <div>
      <h1>Pokemon List</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  // console.log("params => ", context);

  const data = await network.get("https://pokeapi.co/api/v2/pokemon");
  console.log("data ==> ", data);

  return {
    props: {}
  };
};