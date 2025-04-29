import Section from "./Section";

function App() {
  const onHoverFirstSectionHandler = () => {
    console.log("Hover!");
  };
  const onHoverLastSectionHandler = () => {
    alert("Hover!");
  };

  return (
    <div>
      <Section
        onMouseEnter={onHoverFirstSectionHandler}
        title="Props Section Component"
        color="#00F"
        bgColor="#FF0"
      />
      <Section title="Props Component" color="#333" bgColor="#F00" />
      <Section color="#0F0" bgColor="#0FF" />
      <Section onMouseEnter={onHoverLastSectionHandler}>
        <h1>This is Children Element</h1>
      </Section>
    </div>
  );
}

export default App;
