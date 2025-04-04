import Aurora from "../components/Aurora";

function Home(props) {
  return (
    <div {...props}>
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} />
    </div>
  );
}

export default Home;
