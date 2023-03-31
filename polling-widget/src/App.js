import PollWidget from './components/PollWidget';

function App() {

  const ids = [0,1,2,3,4]
  return (
    <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px", backgroundColor: "#202634"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "650px", width: "100%", gap: "40px"}}>
        {ids.map((id) => {
          return (
            <PollWidget pollId={id}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
